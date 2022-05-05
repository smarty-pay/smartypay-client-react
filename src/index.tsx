/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Lang, Theme, Util} from 'smartypay-client-sdk';
import styles from "./assets/style.module.css";
import Icon from './assets/icon.svg';
import React from 'react';

const {label, tokenLabel} = Util;

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
    lang,
    amount,
    token,
    theme,
  }: SmartyPayButtonProps
){

  const labelStr = label(lang as Lang);
  const amountStr = amount && token? `${amount} ${tokenLabel(token)}` : '';

  return (
    <button className={`${styles.payButton} ${theme === 'dark'? styles.dark : ''}`}>

      <span>
        <Icon/>
      </span>

      <span>
        {labelStr}
        {amountStr}
      </span>

      <span/>
    </button>
  )
}