/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {I18n, Lang, parseLang, rechargeAddressAppUrl, Theme} from 'smartypay-client-sdk';
import React from 'react';
import {IFrameDialogButton} from '../IFrameDialogButton';

const {labelRechargeAddress} = I18n;

export interface SmartyPayRechargePaymentProps {
  address: string,
  lang?: Lang,
  skipCustomFont?: boolean,
  theme?: Theme,
}

export function SmartyPayRechargePayment(
  {
    address,
    theme,
    lang: langVal,
    skipCustomFont = false,
  }: SmartyPayRechargePaymentProps
){

  const lang = parseLang(langVal);
  const frameOrigin = rechargeAddressAppUrl();

  return <IFrameDialogButton
    frameOrigin={frameOrigin}
    frameUrl={`${frameOrigin}/${address}?lang=${lang}&frame-mode=true`}
    label={labelRechargeAddress(lang)}
    errorParam={!address? 'address' : undefined}
    theme={theme}
    skipCustomFont={skipCustomFont}
    lang={lang}
  />
}