import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AfterSwapAnalytics,
  BeforeSwapAnalytics
} from "../generated/ImpactHook/ImpactHook"

export function createAfterSwapAnalyticsEvent(
  poolId: Bytes,
  sender: Address,
  sqrtPriceX96: BigInt,
  swapAmount1: BigInt,
  priceImpact: BigInt,
  illiq: BigInt,
  timestamp: BigInt
): AfterSwapAnalytics {
  let afterSwapAnalyticsEvent = changetype<AfterSwapAnalytics>(newMockEvent())

  afterSwapAnalyticsEvent.parameters = new Array()

  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromFixedBytes(poolId))
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "swapAmount1",
      ethereum.Value.fromUnsignedBigInt(swapAmount1)
    )
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "priceImpact",
      ethereum.Value.fromUnsignedBigInt(priceImpact)
    )
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam("illiq", ethereum.Value.fromUnsignedBigInt(illiq))
  )
  afterSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return afterSwapAnalyticsEvent
}

export function createBeforeSwapAnalyticsEvent(
  poolId: Bytes,
  sender: Address,
  sqrtPriceX96: BigInt,
  estimatedSwapAmount1: BigInt,
  estimatedPriceImpact: BigInt,
  dynamicFee: i32,
  zeroForOne: boolean,
  timestamp: BigInt
): BeforeSwapAnalytics {
  let beforeSwapAnalyticsEvent = changetype<BeforeSwapAnalytics>(newMockEvent())

  beforeSwapAnalyticsEvent.parameters = new Array()

  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromFixedBytes(poolId))
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "sqrtPriceX96",
      ethereum.Value.fromUnsignedBigInt(sqrtPriceX96)
    )
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "estimatedSwapAmount1",
      ethereum.Value.fromUnsignedBigInt(estimatedSwapAmount1)
    )
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "estimatedPriceImpact",
      ethereum.Value.fromUnsignedBigInt(estimatedPriceImpact)
    )
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "dynamicFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(dynamicFee))
    )
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "zeroForOne",
      ethereum.Value.fromBoolean(zeroForOne)
    )
  )
  beforeSwapAnalyticsEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return beforeSwapAnalyticsEvent
}
