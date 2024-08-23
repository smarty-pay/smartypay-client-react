/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { I18n, initOpenSansFont, Util } from 'smartypay-client-sdk';

import Icon from '../assets/icon.svg';
import styles from '../assets/style.module.css';

import type { Lang, Theme } from 'smartypay-client-sdk';

const { makeElem } = Util;
const { errorParam } = I18n;

export interface IFrameDialogButtonProps {
  frameOrigin: string;
  frameUrl: string;
  label: string;
  errorParam: string | undefined;
  lang: Lang;
  skipCustomFont: boolean | undefined;
  theme: Theme | undefined;
}

export function IFrameDialogButton({
  frameOrigin,
  frameUrl,
  label: labelStr,
  errorParam: errorParamVal,
  lang,
  theme,
  skipCustomFont = false,
}: IFrameDialogButtonProps) {
  const [actionId, setActionId] = useState(-1);
  const [opened, setOpened] = useState(false);

  // call action
  useLayoutEffect(() => {
    if (actionId < 0 || opened) return () => {};

    let iframeParent: HTMLElement | undefined;

    // timeout for visual click
    const timerId = setTimeout(showFrame, 600);

    function showFrame() {
      setOpened(true);

      iframeParent = makeElem(`<div class="${styles.iframeContainer}"></div>`);
      const iframe = makeElem(
        `<iframe class="${styles.frame}" src="${frameUrl}" scrolling="0" frameborder="0"></iframe>`,
      );

      iframeParent.appendChild(iframe);
      document.body.appendChild(iframeParent);
      document.addEventListener('keydown', onEsc);
      window.addEventListener('message', onFrameEvent);
    }

    // close events
    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDialog();
      }
    }

    // iframe events
    function onFrameEvent(event: MessageEvent) {
      if (event.origin !== frameOrigin) {
        return;
      }

      const { type, value } = event.data || {};

      if (type === 'smartypay-event' && value === 'close') {
        closeDialog();
      }
    }

    function closeDialog() {
      clearTimeout(timerId);

      if (iframeParent) {
        document.removeEventListener('keydown', onEsc);
        window.removeEventListener('message', onFrameEvent);

        document.body.removeChild(iframeParent);
        iframeParent = undefined;

        setOpened(false);
      }
    }

    return () => {
      closeDialog();
    };
  }, [actionId, frameOrigin, frameUrl]);

  useLayoutEffect(() => {
    if (!skipCustomFont) {
      // add our custom font into page's head tag
      initOpenSansFont();
    }
  }, [skipCustomFont]);

  const errorElem = useMemo(() => {
    if (errorParamVal) return <div className={styles.error}>{errorParam(errorParamVal, lang)}</div>;

    return undefined;
  }, [errorParamVal, lang]);

  const hasError = !!errorElem;

  return (
    <div className={`${styles.root} smartypay-root`}>
      <button
        className={`${styles.payButton} ${theme === 'dark' ? styles.dark : ''} ${hasError ? styles.disabled : ''}`}
        disabled={hasError}
        onClick={() => {
          setActionId(Math.random());
        }}
      >
        <span>
          <Icon />
        </span>

        <span>{labelStr}</span>

        <span />
      </button>

      {errorElem}
    </div>
  );
}
