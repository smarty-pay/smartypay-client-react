/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {I18n, Lang, parseLang, pushAddressAppUrl, Theme} from 'smartypay-client-sdk';
import React from 'react';
import {IFrameDialogButton} from '../IFrameDialogButton';

const {labelPushAddress} = I18n;

export interface SmartyPayPushPaymentProps {
  address: string,
  lang?: Lang,
  skipCustomFont?: boolean,
  theme?: Theme,
}

export function SmartyPayPushPayment(
  {
    address,
    theme,
    lang: langVal,
    skipCustomFont = false,
  }: SmartyPayPushPaymentProps
){

  const lang = parseLang(langVal);
  const frameOrigin = pushAddressAppUrl();

  return <IFrameDialogButton
    frameOrigin={frameOrigin}
    frameUrl={`${frameOrigin}/${address}?lang=${lang}&frame-mode=true`}
    label={labelPushAddress(lang)}
    errorParam={!address? 'address' : undefined}
    theme={theme}
    skipCustomFont={skipCustomFont}
    lang={lang}
  />
}