import axios from 'app/Axios'
import { errorLog, isAndroid, isIOS } from 'app/helpers/utils'
import { useEffect, useState } from 'react'

import { Alert } from 'react-native'
import {
    PurchaseError,
    clearTransactionIOS,
    currentPurchase,
    endConnection,
    finishTransaction,
    getProducts,
    initConnection,
    isIosStorekit2,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase
} from 'react-native-iap'

export const useIapPayment = ({ course_id_ipa, setLoadingSpinner }) => {
    const [success, setSuccess] = useState(false)
    const [products, setProducts] = useState()
    useEffect(() => {
        let purchaseUpdateSubscription
        let purchaseErrorSubscription

        const initializeIAP = async () => {
            try {
                await initConnection()

                if (isIOS) {
                    await clearTransactionIOS()
                }
            } catch (error) {
                if (error instanceof PurchaseError) {
                    errorLog({
                        message: `[${error.code}]: ${error.message}`,
                        error
                    })
                } else {
                    errorLog({ message: 'finishTransaction', error })
                }
            }
        }

        const fetchProducts = async () => {
            try {
                const products = await getProducts({
                    skus: [course_id_ipa]
                })
                setProducts(products)
            } catch (error) {
                console.log('Error fetching products:', error)
            }
        }

        const handlePurchaseUpdate = async purchase => {
            const receipt = purchase.transactionReceipt
                ? purchase.transactionReceipt
                : purchase.originalJson

            setLoadingSpinner(false)

            if (receipt) {
                try {
                    await markUserAsBought(purchase)
                    const acknowledgeResult = await finishTransaction({
                        purchase,
                        isConsumable: false
                    })

                    setLoadingSpinner(false)
                    console.info('acknowledgeResult', acknowledgeResult)
                } catch (error) {
                    errorLog({ message: 'finishTransaction', error })
                }
            }
        }

        const handlePurchaseError = error => {
            setLoadingSpinner(false)
            Alert.alert('Lỗi', 'Yêu cầu thanh toán thất bại', [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'default'
                }
            ])
            console.warn('purchaseErrorListener', error)
        }

        Promise.all([initializeIAP(), fetchProducts()])
            .then(() => {
                purchaseUpdateSubscription =
                    purchaseUpdatedListener(handlePurchaseUpdate)
                purchaseErrorSubscription =
                    purchaseErrorListener(handlePurchaseError)
            })
            .catch(error => {
                // Handle initialization error
                console.log('Error initializing IAP:', error)
            })

        return () => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove()
            }

            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove()
            }
            endConnection()
        }
    }, [])

    const handlePurchase = async () => {
        if (!products[0]?.productId) return
        setLoadingSpinner(true)
        try {
            const purchase = await requestPurchase({
                sku: products[0]?.productId
            })

            await markUserAsBought(purchase)
            setLoadingSpinner(false)
        } catch (error) {
            setLoadingSpinner(false)
            Alert.alert('Lỗi', 'Yêu cầu thanh toán thất bại', [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'default'
                }
            ])
            if (error instanceof PurchaseError) {
                errorLog({
                    message: `[${error.code}]: ${error.message}`,
                    error
                })
            } else {
                errorLog({ message: 'handleBuyProduct', error })
            }
        }
    }

    const markUserAsBought = async purchase => {
        await axios.post('payment/activate', {
            productId: purchase.productId,
            transactionDate: purchase.transactionDate,
            transactionId: purchase.transactionId,
            transactionReceipt: purchase.transactionReceipt,
            courseId: id
        })
    }

    const checkCurrentPurchase = async (
        currentPurchase,
        finishTransaction,
        setSuccess
    ) => {
        setLoadingSpinner(false)
        try {
            if (
                (isIosStorekit2() && currentPurchase?.transactionId) ||
                currentPurchase?.transactionReceipt
            ) {
                await finishTransaction({
                    purchase: currentPurchase,
                    isConsumable: false
                })

                setSuccess(true)

                // Call the API to mark the user as bought
                await markUserAsBought(currentPurchase)
            }
        } catch (error) {
            if (error instanceof PurchaseError) {
                errorLog({
                    message: `[${error.code}]: ${error.message}`,
                    error
                })
            } else {
                errorLog({ message: 'handleBuyProduct', error })
            }
        }
    }

    useEffect(() => {
        checkCurrentPurchase(currentPurchase, finishTransaction, setSuccess)
    }, [currentPurchase, finishTransaction, setSuccess])

    return {
        handlePurchase
    }
}
