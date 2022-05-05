/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Theme, Util} from 'smartypay-client-sdk';
import styles from "./assets/style.module.css";
import Icon from './assets/icon.svg';
import React, {useMemo} from 'react';

const {label, tokenLabel, errorParam, parseLang} = Util;

export interface SmartyPayButtonProps {
  apiKey: string | undefined,
  token: string | undefined,
  amount: string | undefined,
  lang?: string,
  skipCustomFont?: boolean,
  theme?: Theme,
}

export function SmartyPayButton(
  {
    apiKey,
    amount,
    token,
    theme,
    lang: langVal,
  }: SmartyPayButtonProps
){

  const lang = parseLang(langVal);
  const labelStr = label(lang);
  const amountStr = amount && token? `${amount} ${tokenLabel(token)}` : '';

  const errorElem = useMemo(()=>{

    if( ! apiKey)
      return <div className={styles.error}>${errorParam('apiKey', lang)}</div>;

    if( ! token)
      return <div className={styles.error}>${errorParam('token', lang)}</div>;

    if( ! amount)
      return <div className={styles.error}>${errorParam('amount', lang)}</div>;

    return undefined;

  }, [apiKey, lang]);

  const hasError = !!errorElem;

  return (
    <div className={styles.root}>

      <button
        className={`${styles.payButton} ${theme === 'dark'? styles.dark : ''} ${hasError? styles.disabled : ''}`}
        disabled={hasError}
      >

        <span>
          <Icon/>
        </span>

        <span>
          {labelStr}
          {amountStr}
        </span>

        <span/>
      </button>

      {errorElem}
    </div>
  )
}