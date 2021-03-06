import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Wallet, WalletType } from '@silicoin/api';
import { useGetCatListQuery, useGetWalletsQuery } from '@silicoin/api-react';
import { Trans } from '@lingui/macro';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Select } from '@silicoin/core';
import type OfferRowData from './OfferRowData';
import type CATToken from '../../../types/CATToken';

type WalletOfferAssetSelection = {
  walletId: number;
  walletType: WalletType;
  name: string;
  symbol?: string;
  displayName: string;
  disabled: boolean;
  tail?: string;
};

function buildAssetSelectorList(
  wallets: Wallet[],
  catList: CATToken[],
  rows: OfferRowData[],
  otherRows: OfferRowData[],
  selectedWalletId: number): WalletOfferAssetSelection[]
{
  const list: WalletOfferAssetSelection[] = [];
  const usedWalletIds: Set<number> = new Set();
  const otherUsedWalletIds: Set<number> = new Set();

  rows.map(row => {
    if (row.assetWalletId !== undefined && row.assetWalletId !== selectedWalletId) {
      usedWalletIds.add(row.assetWalletId);
    }
  });

  otherRows.map(row => {
    if (row.assetWalletId !== undefined) {
      otherUsedWalletIds.add(row.assetWalletId);
    }
  });

  wallets.map(wallet => {
    const walletId: number = wallet.id;
    const walletType: WalletType = wallet.type;
    let name: string | undefined;
    let symbol: string | undefined;
    let tail: string | undefined;
    let disabled: boolean = false;

    if (usedWalletIds.has(walletId)) {
      return;
    }

    // Disable the selection of wallets that are used by the other side of the trade
    if (otherUsedWalletIds.has(walletId)) {
      disabled = true;
    }

    if (wallet.type === WalletType.STANDARD_WALLET) {
      name = 'Silicoin';
      symbol = 'SIT';
    }
    else if (wallet.type === WalletType.CAT) {
      name = wallet.name;
      tail = wallet.meta.tail;
      const cat = catList.find(cat => cat.assetId.toLowerCase() === tail?.toLowerCase());

      if (cat) {
        symbol = cat.symbol;
      }
    }

    if (name) {
      const displayName = name + (symbol ? ` (${symbol})` : '');
      list.push({ walletId, walletType, name, symbol, displayName, disabled, tail });
    }
  });
  return list;
}

type OfferAssetSelectorProps = {
  name: string;
  id: string;
  tradeSide: 'buy' | 'sell';
  defaultValue: any;
  onChange?: (selectedWalletId: number, selectedWalletType: WalletType) => void;
  disabled?: boolean;
};

function OfferAssetSelector(props: OfferAssetSelectorProps): JSX.Element {
  const { name, id, tradeSide, defaultValue, onChange, ...rest } = props;
  const { data: wallets, isLoading } = useGetWalletsQuery();
  const { data: catList = [], isLoading: isCatListLoading } = useGetCatListQuery();
  const { getValues, watch } = useFormContext();
  const rows = watch(tradeSide === 'buy' ? 'takerRows' : 'makerRows');
  const otherRows = watch(tradeSide === 'buy' ? 'makerRows' : 'takerRows');
  const selectedWalletId = getValues(id);
  const options: WalletOfferAssetSelection[] = useMemo(() => {
    if (isLoading || isCatListLoading) {
      return [];
    }
    return buildAssetSelectorList(wallets, catList, rows, otherRows, selectedWalletId);
  }, [wallets, catList, rows, otherRows]);

  function handleSelection(selectedWalletId: number, selectedWalletType: WalletType) {
    if (onChange) {
      onChange(selectedWalletId, selectedWalletType);
    }
  }

  return (
    // Form control with popup selection of assets
    <FormControl variant="filled" fullWidth {...rest}>
      <InputLabel required focused>
        <Trans>Asset Type</Trans>
      </InputLabel>
      <Select name={name} id={id} defaultValue={defaultValue || ''}>
        {options.map((option) => (
          <MenuItem
            disabled={option.disabled}
            value={option.walletId}
            key={option.walletId}
            onClick={() => handleSelection(option.walletId, option.walletType)}
          >
            <Trans>{option.displayName}</Trans>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

OfferAssetSelector.defaultProps = {
  disabled: false,
}

export default OfferAssetSelector;
