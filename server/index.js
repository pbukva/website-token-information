const Web3 = require('web3')
const express = require('express')
const path = require('path') // NEW
const axios = require('axios')
const BN = require('bn.js')
const parseString = require('xml2js').parseString
const app = express()
const port = process.env.PORT || 8000
const PROJECT_ID = 'cab205e574974e6d903844cb7da7537d'

const DIST_DIR = path.join(__dirname, '../dist')
const ONE_HOUR = 1000 * 60 * 60
const STAKING_API = 'http://staking.fetch.ai/api/auction_status?lastBlock=0'
const ETHERSCAN_API_KEY = '2WQZAX9F42ZFGXPBCKHXTTGYGU2A6CD6VG'
const CONTRACT_ABCI_STRINGIFIED = '[{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"state","type":"bool"}],"name":"setTransferAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"recoverTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setReleaseAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"burnAmount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mintAgents","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"state","type":"bool"}],"name":"setMintAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"name":"setTokenInformation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradeAgent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"releaseTokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradeMaster","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fromWhom","type":"address"}],"name":"transferToOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUpgradeState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"transferAgents","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"released","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"canUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"tokensToBeReturned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalUpgraded","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"releaseAgent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"agent","type":"address"}],"name":"setUpgradeAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isToken","outputs":[{"name":"weAre","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BURN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"master","type":"address"}],"name":"setUpgradeMaster","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_initialSupply","type":"uint256"},{"name":"_decimals","type":"uint256"},{"name":"_mintable","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fromWhom","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"OwnerReclaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newName","type":"string"},{"indexed":false,"name":"newSymbol","type":"string"}],"name":"UpdatedTokenInformation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Upgrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"agent","type":"address"}],"name":"UpgradeAgentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"state","type":"bool"}],"name":"MintingAgentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"burnedAmount","type":"uint256"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]'
const CONTRACT_ADDRESS = '0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85'

const CONTRACT_OWNER_ADDRESS = "0x7cd9497b3da5de1eba948fa574c4de771124f1d9"
const TOTAL_LOCKED = '109534769'
const TOTAL_FET_SUPPLY = new BN('1152997575')
const TEN_TO_EIGHTEEN = '1' + '0'.repeat(18)
const NUMERATOR = new BN(TEN_TO_EIGHTEEN)
const FETCH_AGENTS = 'http://soef.fetch.ai:9002/'
const TOTAL_SUPPLY_METTALEX = new BN("40000000")

const METTALEX_FOUNDATION_ADDRESS =  "0x2f2bd2745b24d73707817d1d5de1de7504241ac9";
const METTALEX_STAKING_ADDRESS = "0x7354f36fd74a656b4db8429c3fd937b99cd69e45";
const METTALEX_CONTRACT_ABI_STRINGIFIED = `[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_cap","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`
const METTALEX_CONTRACT_ADDRESS = "0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14"

const { Pool } = require('pg')
const pool = new Pool()
let staked = ''
let unreleasedAmount = ''
let twentyFourHoursAgoEthereumBlockNumber
let fetTransferedInLastTwentyFourHours = ''
let largeTransferCountInLastTwentyFourHours = ''
let currentCirculatingSupply = ''

let totalAgentsEver = ''
let totalAgentsOnlineRightNow = ''
let peakAgentsOnlineNow = ''
let totalSearchQueriesForAgentsToFindOtherAgents = ''
let totalAgentsFound = ''

let circulatingSupplyMettalex = ''


String.prototype.insertCommas = function () {
  return this.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

function calculateTotalStaked (phase, finalisationPrice, slotsSold) {
  // if phase 0 there is nothing staked.
  if (phase === 0) return '0'
  const erc20StakedAmount = new BN(finalisationPrice).mul(new BN(slotsSold))
  const amount = erc20StakedAmount.div(NUMERATOR)
  return amount.toString()
}

function getEthereumBlockNumberFrom24HoursAgo () {
  const twentyFourHoursAgoUnixTimestamp =
    Math.floor(Date.now() / 1000) - 24 * 3600
  axios
    .get(
      `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${twentyFourHoursAgoUnixTimestamp}&closest=before&apikey=${ETHERSCAN_API_KEY}`
    )
    .then(resp => {
      if (resp.status !== 200 || typeof resp.data === 'undefined') return
      twentyFourHoursAgoEthereumBlockNumber = parseInt(resp.data.result)
    })
    .catch(err => {
      console.log('Ethereum block number request rejected with status : ', err)
    })
}

getEthereumBlockNumberFrom24HoursAgo()
setInterval(getEthereumBlockNumberFrom24HoursAgo, 15000)

function getSummedFETTransactions () {
  if (typeof twentyFourHoursAgoEthereumBlockNumber === 'undefined') return

  pool.query(
    `SELECT SUM(fetvalue) as TOTAL from fettxs where blocknumber > ${twentyFourHoursAgoEthereumBlockNumber}`,
    (err, res) => {
      if (
        typeof res === 'undefined' ||
        typeof res.rows[0] === 'undefined' ||
        typeof res.rows[0].total === 'undefined'
      ) {
        return
      }

      if (res.rows[0].total === null) {
        fetTransferedInLastTwentyFourHours = '0'
      } else {
        fetTransferedInLastTwentyFourHours = res.rows[0].total
      }
    }
  )
}

setInterval(getSummedFETTransactions, 5000)

function countLargeTransactions () {
  if (typeof twentyFourHoursAgoEthereumBlockNumber === 'undefined') return

  pool.query(
    `SELECT COUNT(fetvalue) from fettxs where blocknumber > ${twentyFourHoursAgoEthereumBlockNumber} AND fetvalue > 250000`,
    (err, res) => {
      if (
        typeof res === 'undefined' ||
        typeof res.rows[0] === 'undefined' ||
        typeof res.rows[0].count === 'undefined'
      ) {
        return
      }
      largeTransferCountInLastTwentyFourHours = res.rows[0].count
    }
  )
}

setInterval(countLargeTransactions, 5000)

function FETRemainingInContract () {

  const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + PROJECT_ID))

  const contract = new web3.eth.Contract(JSON.parse(CONTRACT_ABCI_STRINGIFIED), CONTRACT_ADDRESS)
  contract.methods.balanceOf(CONTRACT_OWNER_ADDRESS).call((error, balance) => {
    contract.methods.decimals().call((error, decimals) => {
      if (error) return
          unreleasedAmount = new BN(balance.toString()).div(NUMERATOR).toString()
    })
  })
}

FETRemainingInContract()
setInterval(FETRemainingInContract, ONE_HOUR)


function MettalexCirculatingSupply () {

  const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + PROJECT_ID))


  const contract = new web3.eth.Contract(JSON.parse(METTALEX_CONTRACT_ABI_STRINGIFIED), METTALEX_CONTRACT_ADDRESS)

  const promise1 = balance(contract, METTALEX_STAKING_ADDRESS)
  const promise2 = balance(contract, METTALEX_FOUNDATION_ADDRESS)

  Promise.all([promise1, promise2]).then((arrayOfPromises) => {
   const toDeduct =  arrayOfPromises[0].add(arrayOfPromises[1])
     circulatingSupplyMettalex = TOTAL_SUPPLY_METTALEX.sub(toDeduct).toString()
  }).catch(err => {
      console.log('Mettalex contract balanceof api request rejected with status : ', err)
    })


  function balance(contract, address){
    return new Promise(function(resolve, reject) {
      let res
      contract.methods.balanceOf(address).call((error, balance) => {
        contract.methods.decimals().call((error, decimals) => {
          if (error) return reject()
          res = new BN(balance.toString()).div(NUMERATOR)
          resolve(res)
        })
      })
    })
  }

}

MettalexCirculatingSupply()
setInterval(MettalexCirculatingSupply, ONE_HOUR)

/**
 * gets staking data and saves it to text file as json string.
 */
function totalStaked () {
  axios
    .get(STAKING_API)
    .then(resp => {
      if (resp.status !== 200) return
      staked = calculateTotalStaked(
        resp.data.payload.phase,
        resp.data.payload.finalisationPrice,
        resp.data.payload.slotsSold
      )
    })
    .catch(err => {
      console.log('staking api request rejected with status : ', err)
    })
}

// calc the total amount staked
totalStaked()
setInterval(totalStaked, 15000)

function calcCurrentCirculatingSupply () {
  if (staked === '' || unreleasedAmount === '') return
  // Total - locked - staked - remaining == current circulating supply.
  // Un-released tokens are understood to be the "remaining" part of this calculation
  debugger;
  currentCirculatingSupply = TOTAL_FET_SUPPLY.sub(new BN(staked)).sub(new BN(TOTAL_LOCKED)).sub(new BN(unreleasedAmount)).abs().toString()
}

calcCurrentCirculatingSupply()
setInterval(calcCurrentCirculatingSupply, 5000)

function AgentInformation () {
  axios
    .get(FETCH_AGENTS)
    .then(resp => {
      if (resp.status !== 200) return
      // parse the xml
      parseString(resp.data, function (err, result) {
        const response = result.response
        totalAgentsEver = response.statistics[0].total_agents_ever[0]
        totalAgentsOnlineRightNow = new BN(response.statistics[0].total_agents_ever[0]).sub(new BN(response.statistics[0].expired_agents[0])).toString()
        peakAgentsOnlineNow = response.statistics[0].peaks[0].peak[0]._
        totalSearchQueriesForAgentsToFindOtherAgents = response.statistics[0].total_search_queries[0]
        totalAgentsFound = response.statistics[0].total_agents_found[0]
      })

    })
}

AgentInformation()
setInterval(AgentInformation, 15000)

app.use(express.static(DIST_DIR))

app.get('/token_information_api', (req, res) => {
  res.send({
    totalStaked: staked,
    unreleasedAmount: unreleasedAmount,
    recentlyTransfered: fetTransferedInLastTwentyFourHours,
    recentLargeTransfers: largeTransferCountInLastTwentyFourHours,
    currentCirculatingSupply: currentCirculatingSupply,
    totalAgentsEver: totalAgentsEver,
    totalAgentsOnlineRightNow: totalAgentsOnlineRightNow,
    peakAgentsOnlineNow: peakAgentsOnlineNow,
    totalSearchQueriesForAgentsToFindOtherAgents: totalSearchQueriesForAgentsToFindOtherAgents,
    totalAgentsFound: totalAgentsFound,
  })
})


app.get('/mettalex_circulating_supply', (req, res) => {
  res.send(circulatingSupplyMettalex)
})


app.listen(port, function () {
  console.log('App listening on port: ' + port)
})
