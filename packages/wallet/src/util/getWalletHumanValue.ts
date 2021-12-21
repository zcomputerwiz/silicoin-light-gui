import type Wallet from '../types/Wallet';
import WalletType from '../constants/WalletType';
import { mojo_to_colouredcoin_string, mojo_to_silicoin_string } from './silicoin';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? mojo_to_colouredcoin_string(value)
    : mojo_to_silicoin_string(value);
}
