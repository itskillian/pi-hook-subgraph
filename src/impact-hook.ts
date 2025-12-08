import {
  AfterSwapAnalytics as AfterSwapAnalyticsEvent,
  BeforeSwapAnalytics as BeforeSwapAnalyticsEvent
} from "../generated/ImpactHook/ImpactHook"
import { AfterSwapAnalytics, BeforeSwapAnalytics } from "../generated/schema"

export function handleAfterSwapAnalytics(event: AfterSwapAnalyticsEvent): void {
  let entity = new AfterSwapAnalytics(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.sender = event.params.sender
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.swapAmount1 = event.params.swapAmount1
  entity.priceImpact = event.params.priceImpact
  entity.illiq = event.params.illiq
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeforeSwapAnalytics(
  event: BeforeSwapAnalyticsEvent
): void {
  let entity = new BeforeSwapAnalytics(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.poolId = event.params.poolId
  entity.sender = event.params.sender
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.estimatedSwapAmount1 = event.params.estimatedSwapAmount1
  entity.estimatedPriceImpact = event.params.estimatedPriceImpact
  entity.dynamicFee = event.params.dynamicFee
  entity.zeroForOne = event.params.zeroForOne
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
