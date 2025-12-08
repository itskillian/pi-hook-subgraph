import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AfterSwapAnalytics } from "../generated/schema"
import { AfterSwapAnalytics as AfterSwapAnalyticsEvent } from "../generated/ImpactHook/ImpactHook"
import { handleAfterSwapAnalytics } from "../src/impact-hook"
import { createAfterSwapAnalyticsEvent } from "./impact-hook-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let poolId = Bytes.fromI32(1234567890)
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let sqrtPriceX96 = BigInt.fromI32(234)
    let swapAmount1 = BigInt.fromI32(234)
    let priceImpact = BigInt.fromI32(234)
    let illiq = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let newAfterSwapAnalyticsEvent = createAfterSwapAnalyticsEvent(
      poolId,
      sender,
      sqrtPriceX96,
      swapAmount1,
      priceImpact,
      illiq,
      timestamp
    )
    handleAfterSwapAnalytics(newAfterSwapAnalyticsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AfterSwapAnalytics created and stored", () => {
    assert.entityCount("AfterSwapAnalytics", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "poolId",
      "1234567890"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sqrtPriceX96",
      "234"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "swapAmount1",
      "234"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "priceImpact",
      "234"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "illiq",
      "234"
    )
    assert.fieldEquals(
      "AfterSwapAnalytics",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
