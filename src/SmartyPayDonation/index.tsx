/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */
import {donationAppUrl, I18n, Lang, parseLang, Theme} from 'smartypay-client-sdk';
import React from 'react';
import {IFrameDialogButton} from '../IFrameDialogButton';

const {labelDonation} = I18n;

export interface SmartyPayDonationProps {
  donationId: string,
  lang?: Lang,
  skipCustomFont?: boolean,
  theme?: Theme,
}

export function SmartyPayDonation(
  {
    donationId,
    theme,
    lang: langVal,
    skipCustomFont = false,
  }: SmartyPayDonationProps
){

  const lang = parseLang(langVal);
  const frameOrigin = donationAppUrl();

  return <IFrameDialogButton
    frameOrigin={frameOrigin}
    frameUrl={`${frameOrigin}/${donationId}?lang=${lang}&frame-mode=true`}
    label={labelDonation(lang)}
    errorParam={!donationId? 'donationId' : undefined}
    theme={theme}
    skipCustomFont={skipCustomFont}
    lang={lang}
  />
}