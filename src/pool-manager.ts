import { BigInt } from '@graphprotocol/graph-ts'


import { Initialize as InitializeEvent } from "../generated/PoolManager/PoolManager"
import { Pool } from "../generated/schema"

export function handleInitialize(event: InitializeEvent): void {
  const poolId = event.params.id.toHexString()
  const pool = new Pool(poolId)

  pool.createdAtTimestamp = event.block.timestamp
  pool.createdAtBlockNumber = event.block.number
  pool.token0 = event.params.currency0.toHexString()
  pool.token1 = event.params.currency1.toHexString()
  pool.feeTier = BigInt.fromI32(event.params.fee)
  pool.tickSpacing = BigInt.fromI32(event.params.tickSpacing)
  pool.hooks = event.params.hooks.toHexString()
  pool.sqrtPriceX96 = event.params.sqrtPriceX96
  pool.estimatedSwapAmount1 = BigInt.fromI32(0)
  pool.estimatedPriceImpact = BigInt.fromI32(0)
  pool.swapAmount1 = BigInt.fromI32(0)
  pool.priceImpact = BigInt.fromI32(0)
  pool.dynamicFeePips = BigInt.fromI32(0)
  pool.previousIlliq = BigInt.fromI32(0)
  pool.illiq = BigInt.fromI32(0)

  pool.save()
}
