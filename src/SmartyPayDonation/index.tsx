import {I18n, initOpenSansFont, Lang, parseLang, Theme, Util} from 'smartypay-client-sdk';
import styles from './assets/style.module.css';
import Icon from './assets/icon.svg';
import React, {useLayoutEffect, useMemo, useState} from 'react';

const {postForm} = Util;
const {tokenLabel, errorParam, labelDonation} = I18n;

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

  const [actionId, setActionId] = useState(-1);

  const lang = parseLang(langVal);
  const labelStr = labelDonation(lang);

  // call action
  useLayoutEffect(()=>{

    if(actionId < 0)
      return;

    // timeout for visual click
    const timerId = setTimeout(()=>{

      postForm('https://api.smartypay.io/checkout', {
        'api-key': apiKey,
        token,
        amount,
        lang,
      });

    }, 600);

    return ()=> {
      clearTimeout(timerId);
    }
  }, [actionId, donationId, lang]);

  useLayoutEffect(()=>{
    if( ! skipCustomFont){
      // add our custom font into page's head tag
      initOpenSansFont();
    }
  }, [skipCustomFont]);

  const errorElem = useMemo(()=>{

    if( ! donationId)
      return <div className={styles.error}>{errorParam('donationId', lang)}</div>;

    return undefined;

  }, [donationId, lang]);

  const hasError = !!errorElem;

  return (
    <div className={`${styles.root} smartypay-root`}>

      <button
        className={`${styles.payButton} ${theme === 'dark'? styles.dark : ''} ${hasError? styles.disabled : ''}`}
        disabled={hasError}
        onClick={()=>{
          setActionId(Math.random());
        }}
      >

        <span>
          <Icon/>
        </span>

        <span>
          {labelStr}
        </span>

        <span/>
      </button>

      {errorElem}
    </div>
  )
}