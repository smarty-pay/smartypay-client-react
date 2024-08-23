/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import React from 'react';
import { I18n, parseLang, rechargeAddressAppUrl } from 'smartypay-client-sdk';

import { IFrameDialogButton } from '../IFrameDialogButton';

import type { Lang, Theme } from 'smartypay-client-sdk';

const { labelRechargeAddress } = I18n;

export interface SmartyPayRechargePaymentProps {
  address: string;
  lang?: Lang;
  skipCustomFont?: boolean;
  theme?: Theme;
}

export function SmartyPayRechargePayment({
  address,
  theme,
  lang: langVal,
  skipCustomFont = false,
}: SmartyPayRechargePaymentProps) {
  const lang = parseLang(langVal);
  const frameOrigin = rechargeAddressAppUrl();

  return (
    <IFrameDialogButton
      frameOrigin={frameOrigin}
      frameUrl={`${frameOrigin}/${address}?lang=${lang}&frame-mode=true`}
      label={labelRechargeAddress(lang)}
      errorParam={!address ? 'address' : undefined}
      theme={theme}
      skipCustomFont={skipCustomFont}
      lang={lang}
    />
  );
}
