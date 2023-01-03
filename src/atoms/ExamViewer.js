import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
    Appearance,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'

import { Text } from 'native-base'

const initHTML = ``

function createContentStyle(theme) {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
        backgroundColor: '#2e3847',
        color: '#fff',
        caretColor: 'red', // initial valid// initial valid
        placeholderColor: 'gray',
        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: 'font-size: 16px; min-height: 200px;' // initial valid
    }
    if (theme === 'light') {
        contentStyle.backgroundColor = '#fff'
        contentStyle.color = '#000033'
        contentStyle.placeholderColor = '#a9a9a9'
    }
    return contentStyle
}

const ExamViewer = ({ data }) => {
    let richText = useRef()
    let linkModal = useRef()
    let scrollRef = useRef()
    // save on html
    let contentRef = useRef(initHTML)

    let [theme, setTheme] = useState('light')
    let contentStyle = useMemo(() => createContentStyle(theme), [theme])

    // editor change data
    let handleChange = useCallback(html => {
        // save html to content ref;
        contentRef.current = html
    }, [])

    // theme change to editor color
    let themeChange = useCallback(({ colorScheme }) => {
        setTheme(colorScheme)
    }, [])

    let editorInitializedCallback = useCallback(() => {
        richText.current.registerToolbar(function (items) {
            // console.log('Toolbar click, selected items (insert end callback):', items);
        })
    }, [])

    // editor height change
    let handleHeightChange = useCallback(height => {
        console.log('editor height change:', height)
    }, [])

    let onInsertLink = useCallback(() => {
        // this.richText.current?.insertLink('Google', 'http://google.com');
        linkModal.current?.setModalVisible(true)
    }, [])

    let handleFontSize = useCallback(() => {
        // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
        let size = [1, 2, 3, 4, 5, 6, 7]
        richText.current?.setFontSize(size[Math.random(size.length - 1)])
    }, [])

    let handleForeColor = useCallback(() => {
        richText.current?.setForeColor('blue')
    }, [])

    let handleHiliteColor = useCallback(() => {
        richText.current?.setHiliteColor('red')
    }, [])

    let handlePaste = useCallback(data => {
        console.log('Paste:', data)
    }, [])

    // @deprecated Android keyCode 229
    let handleKeyUp = useCallback(data => {
        // console.log('KeyUp:', data);
    }, [])

    // @deprecated Android keyCode 229
    let handleKeyDown = useCallback(data => {
        // console.log('KeyDown:', data);
    }, [])

    let handleInput = useCallback(({ data, inputType }) => {
        // console.log(inputType, data)
    }, [])

    let handleMessage = useCallback(({ type, id, data }) => {
        switch (type) {
            case 'TitleClick':
                const color = ['red', 'blue', 'gray', 'yellow', 'coral']

                // command: $ = document.querySelector
                richText.current?.commandDOM(
                    `$('#${id}').style.color='${
                        color[Math.random(color.length - 1)]
                    }'`
                )
                break
            case 'SwitchImage':
                break
        }
        console.log('onMessage', type, id, data)
    }, [])

    let handleFocus = useCallback(() => {
        console.log('editor focus')
    }, [])

    let handleBlur = useCallback(() => {
        console.log('editor blur')
    }, [])

    let handleCursorPosition = useCallback(scrollY => {
        // Positioning scroll bar
        scrollRef.current.scrollTo({ y: scrollY - 30, animated: true })
    }, [])

    useEffect(() => {
        let listener = [Appearance.addChangeListener(themeChange)]
        return () => {
            listener.forEach(it => it.remove())
        }
    }, [])

    let dark = theme === 'dark'

    return (
        <SafeAreaView style={[styles.container, dark && styles.darkBack]}>
            <ScrollView
                style={[styles.scroll, dark && styles.scrollDark]}
                keyboardDismissMode={'on-drag'}
                ref={scrollRef}
                nestedScrollEnabled={true}
                scrollEventThrottle={20}>
                <RichEditor
                    // initialFocus={true}
                    editorStyle={contentStyle} // default light style
                    ref={richText}
                    style={styles.rich}
                    useContainer={true}
                    enterKeyHint={'done'}
                    // containerStyle={{borderRadius: 24}}
                    placeholder={'please input content'}
                    initialContentHTML={initHTML}
                    editorInitializedCallback={editorInitializedCallback}
                    onChange={handleChange}
                    onHeightChange={handleHeightChange}
                    onPaste={handlePaste}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    onMessage={handleMessage}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onCursorPosition={handleCursorPosition}
                    pasteAsPlainText={true}
                />
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <RichToolbar
                    style={[styles.richBar, dark && styles.richBarDark]}
                    flatContainerStyle={styles.flatStyle}
                    editor={richText}
                    selectedIconTint={'#2095F2'}
                    disabledIconTint={'#bfbfbf'}
                />
                <RichToolbar
                    style={[styles.richBar, dark && styles.richBarDark]}
                    flatContainerStyle={styles.flatStyle}
                    editor={richText}
                    selectedIconTint={'#2095F2'}
                    disabledIconTint={'#bfbfbf'}
                    onInsertLink={onInsertLink}
                    actions={[
                        actions.undo,
                        actions.redo,
                        actions.setStrikethrough,
                        actions.insertOrderedList,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.line,
                        actions.foreColor,
                        actions.hiliteColor,
                        actions.heading1,
                        actions.heading4,
                        'fontSize'
                    ]} // default defaultActions
                    iconMap={{
                        // insertEmoji: phizIcon,
                        [actions.foreColor]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: 'blue' }]}>
                                FC
                            </Text>
                        ),
                        [actions.hiliteColor]: ({ tintColor }) => (
                            <Text
                                style={[
                                    styles.tib,
                                    {
                                        color: tintColor,
                                        backgroundColor: 'red'
                                    }
                                ]}>
                                BC
                            </Text>
                        ),
                        [actions.heading1]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>
                                H1
                            </Text>
                        ),
                        [actions.heading4]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>
                                H4
                            </Text>
                        )
                    }}
                    fontSize={handleFontSize}
                    foreColor={handleForeColor}
                    hiliteColor={handleHiliteColor}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ExamViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        marginTop: 40,
        borderWidth: 1,
        borderColor: '#eee'
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e3e3e3'
    },
    topVi: {
        backgroundColor: '#fafafa'
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969'
    },
    scroll: {
        backgroundColor: '#ffffff'
    },
    scrollDark: {
        backgroundColor: '#2e3847'
    },
    darkBack: {
        backgroundColor: '#191d20'
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15
    },

    input: {
        flex: 1
    },

    tib: {
        textAlign: 'center',
        color: '#515156'
    },

    flatStyle: {
        paddingHorizontal: 12
    }
})
