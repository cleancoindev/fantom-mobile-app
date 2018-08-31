import React, { Component } from 'react';
import TransactionEntity from './transactionEntity/';
import PropTypes from 'prop-types';

/**
 * DisplayTransaction: This component is meant for displaying all transactions.
 */
class DisplayTransaction extends Component {
    render() {
        const { fantomTransactionArr, selectedSortMenu, allTransaction, publicKey, isLoading } = this.props;

        let displayTransaction = '';

        displayTransaction = isLoading === false && fantomTransactionArr && fantomTransactionArr.length > 0 &&
            fantomTransactionArr.map((transaction, index) => {
                return (
                    (selectedSortMenu === transaction.type || selectedSortMenu === allTransaction) &&
                    <TransactionEntity key={index} transaction={transaction} publicKey={publicKey} />
                )
            });

        return displayTransaction;
    }
}

DisplayTransaction.propTypes = {
    fantomTransactionArr: PropTypes.array,
    selectedSortMenu: PropTypes.string,
    allTransaction: PropTypes.string,
    publicKey: PropTypes.string,
    isLoading: PropTypes.bool
}
export default DisplayTransaction;