/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { I18n, initOpenSansFont, parseLang, Util } from 'smartypay-client-sdk';

import Icon from '../assets/icon.svg';
import styles from '../assets/style.module.css';

import type { Lang, Theme } from 'smartypay-client-sdk';

const { postForm } = Util;
const { tokenLabel, errorParam, labelPay } = I18n;

export interface SmartyPayButtonProps {
  apiKey: string | undefined;
  token: string | undefined;
  amount: string | undefined;
  lang?: Lang;
  skipCustomFont?: boolean;
  theme?: Theme;
}

export function SmartyPayButton({
  apiKey,
  amount,
  token,
  theme,
  lang: langVal,
  skipCustomFont = false,
}: SmartyPayButtonProps) {
  const [actionId, setActionId] = useState(-1);

  const lang = parseLang(langVal);
  const labelStr = labelPay(lang);
  const amountStr = amount && token ? `${amount} ${tokenLabel(token)}` : '';

  // call action
  useLayoutEffect(() => {
    if (actionId < 0) return () => {};

    // timeout for visual click
    const timerId = setTimeout(() => {
      postForm('https://api.smartypay.io/checkout', {
        'api-key': apiKey,
        token,
        amount,
        lang,
      });
    }, 600);

    return () => {
      clearTimeout(timerId);
    };
  }, [actionId, apiKey, token, amount, lang]);

  useLayoutEffect(() => {
    if (!skipCustomFont) {
      // add our custom font into page's head tag
      initOpenSansFont();
    }
  }, [skipCustomFont]);

  const errorElem = useMemo(() => {
    if (!apiKey) return <div className={styles.error}>{errorParam('apiKey', lang)}</div>;

    if (!token) return <div className={styles.error}>{errorParam('token', lang)}</div>;

    if (!amount) return <div className={styles.error}>{errorParam('amount', lang)}</div>;

    return undefined;
  }, [apiKey, token, amount, lang]);

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

        <span>
          {labelStr} {amountStr}
        </span>

        <span />
      </button>

      {errorElem}
    </div>
  );
}
