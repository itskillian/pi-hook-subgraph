import { BigInt } from '@graphprotocol/graph-ts'

import {
  AfterSwapAnalytics as AfterSwapAnalyticsEvent,
  BeforeSwapAnalytics as BeforeSwapAnalyticsEvent
} from "../generated/ImpactHook/ImpactHook"
import {
  Pool,
  BeforeSwapAnalytics,
  AfterSwapAnalytics,
} from "../generated/schema"

export function handleBeforeSwapAnalytics(event: BeforeSwapAnalyticsEvent): void {
  const poolId = event.params.poolId.toHexString()
  const pool = Pool.load(poolId)

  if (pool == null) {
    return
  }

  if (pool.token0 && pool.token1) {
    const swapId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    const beforeSwap = new BeforeSwapAnalytics(swapId)

    beforeSwap.transactionHash = event.transaction.hash.toHexString()
    beforeSwap.blockNumber = event.block.number
    beforeSwap.timestamp = event.block.timestamp
    beforeSwap.poolId = poolId
    beforeSwap.sender = event.params.sender
    beforeSwap.origin = event.transaction.from
    beforeSwap.sqrtPriceX96 = event.params.sqrtPriceX96
    beforeSwap.estimatedSwapAmount1 = event.params.estimatedSwapAmount1
    beforeSwap.estimatedPriceImpact = event.params.estimatedPriceImpact
    beforeSwap.dynamicFee = BigInt.fromI32(event.params.dynamicFee)
    beforeSwap.save()

    // pool updates
    pool.estimatedSwapAmount1 = event.params.estimatedSwapAmount1
    pool.estimatedPriceImpact = event.params.estimatedPriceImpact
    pool.dynamicFeePips = BigInt.fromI32(event.params.dynamicFee)
    pool.save()
  }
}

export function handleAfterSwapAnalytics(event: AfterSwapAnalyticsEvent): void {
  const poolId = event.params.poolId.toHexString()
  const pool = Pool.load(poolId)

  if (pool == null) {
    return
  }

  if (pool.token0 && pool.token1) {
    const swapId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    const afterSwap = new AfterSwapAnalytics(swapId)

    afterSwap.transactionHash = event.transaction.hash.toHexString()
    afterSwap.blockNumber = event.block.number
    afterSwap.timestamp = event.block.timestamp
    afterSwap.poolId = poolId
    afterSwap.sender = event.params.sender
    afterSwap.origin = event.transaction.from
    afterSwap.sqrtPriceX96 = event.params.sqrtPriceX96
    afterSwap.swapAmount1 = event.params.swapAmount1
    afterSwap.priceImpact = event.params.priceImpact
    afterSwap.illiq = event.params.illiq
    afterSwap.save()

    // pool updates
    pool.sqrtPriceX96 = event.params.sqrtPriceX96
    pool.swapAmount1 = event.params.swapAmount1
    pool.priceImpact = event.params.priceImpact
    pool.illiq = event.params.illiq
    pool.save()
  }
}

