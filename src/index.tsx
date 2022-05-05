/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {Lang, Theme, Util} from 'smartypay-client-sdk';
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
  }: SmartyPayButtonProps
){
  return (
    <button>

      <span>
        <Icon/>
      </span>

      <span>
        {label(lang as Lang)} ${amount && token? `${amount} ${tokenLabel(token)}` : ''}
      </span>

      <span/>
    </button>
  )
}