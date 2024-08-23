/**
 * SMARTy Pay Client React
 * @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
 */

import { SmartyPayButton, SmartyPayButtonProps } from './SmartyPayButton';
import { SmartyPayDonation, SmartyPayDonationProps } from './SmartyPayDonation';
import { SmartyPayRechargePayment, SmartyPayRechargePaymentProps } from './SmartyPayRechargePayment';

import type { Lang, Theme } from 'smartypay-client-sdk';

export type { Lang };
export type { Theme };
export { SmartyPayButton, SmartyPayButtonProps };
export { SmartyPayDonation, SmartyPayDonationProps };
export { SmartyPayRechargePayment, SmartyPayRechargePaymentProps };
