import {donationAppUrl, I18n, initOpenSansFont, Lang, parseLang, Theme, Util} from 'smartypay-client-sdk';
import styles from './assets/style.module.css';
import Icon from './assets/icon.svg';
import React, {useLayoutEffect, useMemo, useState} from 'react';

const {makeElem} = Util;
const {errorParam, labelDonation} = I18n;

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
  const [opened, setOpened] = useState(false);

  const lang = parseLang(langVal);
  const labelStr = labelDonation(lang);

  // call action
  useLayoutEffect(()=>{

    if(actionId < 0 || opened)
      return;

    let iframeParent: HTMLElement|undefined;
    const frameOrigin = donationAppUrl();

    // timeout for visual click
    const timerId = setTimeout(showFrame, 600);

    function showFrame(){

      setOpened(true);

      const frameUrl = `${frameOrigin}/${donationId}?lang=${lang}&frame-mode=true`;

      iframeParent = makeElem(`<div class="${styles.iframeContainer}"></div>`);
      const iframe = makeElem(`<iframe class="${styles.frame}" src="${frameUrl}" scrolling="0" frameborder="0"></iframe>`);

      iframeParent.appendChild(iframe);
      document.body.appendChild(iframeParent);
      document.addEventListener('keydown', onEsc);
      window.addEventListener("message", onFrameEvent);
    }

    // close events
    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDialog();
      }
    }

    // iframe events
    function onFrameEvent(event: MessageEvent) {

      if( event.origin !== frameOrigin){
        return;
      }

      const {type, value} = event.data || {};

      if(type === 'smartypay-event' && value === 'close'){
        closeDialog();
      }
    }


    function closeDialog(){

      clearTimeout(timerId);

      if(iframeParent){

        document.removeEventListener('keydown', onEsc);
        window.removeEventListener("message", onFrameEvent);

        document.body.removeChild(iframeParent);
        setOpened(false);
      }
    }

    return ()=> {
      closeDialog();
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