"use strict";

let balances;
let cache;
let cacheManager;
let database;
let db;
let priceOracle;
let platforms;
let http;
let tokenCollector;
let addressTransactions;
let polygonAddressTransactions;
let fantomAddressTransactions;
let liquidityTokenCollector;
let priceCollector;
let farmFetcher;
let contractAbiFetcher;
let tokenInfo;
let bscscanRequest;
let cronjobs;
let farmPlatformResolver;
let farmAuto;

let polygonPriceOracle;
let polygonTokenCollector;
let polygonPriceCollector;
let polygonLiquidityTokenCollector;
let polygonCacheManager;
let polygonBalances;
let polygonTokenInfo;
let polygonDb;
let polygonFarmPlatformResolver;
let polygonFarmAuto;

let fantomPriceOracle;
let fantomTokenCollector;
let fantomPriceCollector;
let fantomLiquidityTokenCollector;
let fantomCacheManager;
let fantomBalances;
let fantomTokenInfo;
let fantomDb;
let fantomFarmPlatformResolver;
let fantomFarmAuto;

let kccPriceOracle;
let kccTokenCollector;
let kccPriceCollector;
let kccLiquidityTokenCollector;
let kccCacheManager;
let kccBalances;
let kccTokenInfo;
let kccDb;
let kccFarmPlatformResolver;
let kccAddressTransactions;

let harmonyPriceOracle;
let harmonyTokenCollector;
let harmonyPriceCollector;
let harmonyLiquidityTokenCollector;
let harmonyCacheManager;
let harmonyBalances;
let harmonyTokenInfo;
let harmonyDb;
let harmonyFarmPlatformResolver;
let harmonyAddressTransactions;

let celoPriceOracle;
let celoTokenCollector;
let celoPriceCollector;
let celoLiquidityTokenCollector;
let celoCacheManager;
let celoBalances;
let celoTokenInfo;
let celoDb;
let celoFarmPlatformResolver;
let celoAddressTransactions;

let priceFetcher;

const Cache = require("timed-cache");
const Sqlite = require("better-sqlite3");
const Http = require("./http");
const Db = require("./db");
const Balances = require("./balances");
const Platforms = require("./platforms/platforms");
const PriceOracle = require("./price_oracle");
const TokenCollector = require("./token/token_collector");
const PriceCollector = require("./token/price_collector");
const cacheManagerInstance = require('cache-manager');
const fsStore = require('cache-manager-fs-hash');
const path = require("path");
const AddressTransactions = require("./token/address_transactions");
const LiquidityTokenCollector = require("./token/liquidity_token_collector");
const FarmFetcher = require("./farm/farm_fetcher");
const ContractAbiFetcher = require("./abi/contract_abi_fetcher");
const TokenInfo = require("./token/token_info");
const BscscanRequest = require("./utils/bscscan_request");
const Cronjobs = require("./cronjobs");
const PolygonPriceOracle = require("./chains/polygon/polygon_price_oracle");
const FantomPriceOracle = require("./chains/fantom/fantom_price_oracle");
const KccPriceOracle = require("./chains/kcc/kcc_price_oracle");
const FarmPlatformResolver = require("./farm/farm_platform_resolver");
const HarmonyPriceOracle = require("./chains/harmony/harmony_price_oracle");
const PriceFetcher = require("./chains/price_fetcher");
const CeloPriceOracle = require("./chains/celo/celo_price_oracle");
const CrossPlatforms = require("./platforms/cross_platforms");

const FarmAuto = require("./farm/farm_auto");

const Pancake = require("./platforms/pancake/pancake");
const Swamp = require("./platforms/swamp/swamp");
const Blizzard = require("./platforms/blizzard/blizzard");
const Hyperjump = require("./platforms/hyperjump/hyperjump");
const Slime = require("./platforms/slime/slime");
const Apeswap = require("./platforms/apeswap/apeswap");
const Goose = require("./platforms/goose/goose");
const Cheese = require("./platforms/cheese/cheese");
const Space = require("./platforms/space/space");
const Saltswap = require("./platforms/saltswap/saltswap");
const Mdex = require("./platforms/mdex/mdex");
const Pandayield = require("./platforms/pandayield/pandayield");
const Wault = require("./platforms/wault/wault");
const Cafeswap = require("./platforms/cafeswap/cafeswap");
const Belt = require("./platforms/belt/belt");
const Kebab = require("./platforms/kebab/kebab");
const Polaris = require("./platforms/polaris/polaris");
const Panther = require("./platforms/panther/panther");
const Jetswap = require("./platforms/jetswap/jetswap");
const Warden = require("./platforms/warden/warden");
const Biswap = require("./platforms/biswap/biswap");
const Evodefi = require("./platforms/evodefi/evodefi");
const Eleven = require("./platforms/eleven/eleven");
const Coinswap = require("./platforms/coinswap/coinswap");
const Beefy = require("./platforms/beefy/beefy");
const Treedefi = require("./platforms/bsc/treedefi/treedefi");
const Farmhero = require("./platforms/bsc/farmhero/farmhero");
const Alpaca = require("./platforms/alpaca/alpaca");
const Yieldparrot = require("./platforms/bsc/yieldparrot/yieldparrot");
const Alpha = require("./platforms/alpha/alpha");
const Honeyfarm = require("./platforms/bsc/honeyfarm/honeyfarm");
const Rabbit = require("./platforms/bsc/rabbit/rabbit");
const Qubit = require("./platforms/bsc/qubit/qubit");
const Cream = require("./platforms/bsc/cream/cream");
const Venus = require("./platforms/bsc/venus/venus");
const Fortress = require("./platforms/bsc/fortress/fortress");
const Fortube = require("./platforms/bsc/fortube/fortube");
const Bakery = require("./platforms/bakery/bakery");
const Planet = require("./platforms/bsc/planet/planet");
const Acryptos = require("./platforms/acryptos/acryptos");
const Pancakebunny = require("./platforms/pancakebunny/pancakebunny");
const Autofarm = require("./platforms/autofarm/autofarm");
const Jetfuel = require("./platforms/jetfuel/jetfuel");
const Valuedefi = require("./platforms/valuedefi/valuedefi");
const Jul = require("./platforms/jul/jul");

const Pwault = require("./platforms/polygon/pwault/pwault");
const Polycat = require("./platforms/polygon/polycat/polycat");
const Pjetswap = require("./platforms/polygon/pjetswap/pjetswap");
const Polyzap = require("./platforms/polygon/polyzap/polyzap");
const Augury = require("./platforms/polygon/augury/augury");
const Pswamp = require("./platforms/polygon/pswamp/pswamp");
const Ppancakebunny = require("./platforms/polygon/ppancakebunny/ppancakebunny");
const Mai = require("./platforms/polygon/mai/mai");
const Pfarmhero = require("./platforms/polygon/pfarmhero/pfarmhero");
const Polycrystal = require("./platforms/polygon/polycrystal/polycrystal");
const Mstable = require("./platforms/polygon/mstable/mstable");
const Dinoswap = require("./platforms/polygon/dinoswap/dinoswap");
const Pbeefy = require("./platforms/polygon/pbeefy/pbeefy");
const Pautofarm = require("./platforms/polygon/pautofarm/pautofarm");
const Dfyn = require("./platforms/polygon/dfyn/dfyn");
const Papeswap = require("./platforms/polygon/papeswap/papeswap");
const Psushi = require("./platforms/polygon/psushi/psushi");
const Pcurve = require("./platforms/polygon/pcurve/pcurve");
const PolycatCompound = require("./platforms/polygon/polycat/polycat_compound");
const PolycatPaw = require("./platforms/polygon/polycat/polycat_paw");
const PolycatDecorator = require("./platforms/polygon/polycat/polycat_decorator");
const Peleven = require("./platforms/polygon/peleven/peleven");
const Adamant = require("./platforms/polygon/adamant/adamant");
const Quickswap = require("./platforms/polygon/quickswap/quickswap");
const Pearzap = require("./platforms/polygon/pearzap/pearzap");
const PelevenLeverage = require("./platforms/polygon/peleven/peleven_leverage");
const PelevenDecorator = require("./platforms/polygon/peleven/peleven_decorator");
const Pcream = require("./platforms/polygon/pcream/pcream");
const Pfortube = require("./platforms/polygon/pfortube/pfortube");
const Balancer = require("./platforms/polygon/balancer/balancer");
const Impermax = require("./platforms/polygon/impermax/impermax");

const Spookyswap = require("./platforms/fantom/spookyswap/spookyswap");
const Spiritswap = require("./platforms/fantom/spiritswap/spiritswap");
const Liquiddriver = require("./platforms/fantom/liquiddriver/liquiddriver");
const Fbeefy = require("./platforms/fantom/fbeefy/fbeefy");
const Fcurve = require("./platforms/fantom/fcurve/fcurve");
const Ester = require("./platforms/fantom/ester/ester");
const Frankenstein = require("./platforms/fantom/frankenstein/frankenstein");
const Reaper = require("./platforms/fantom/reaper/reaper");
const Fcream = require("./platforms/fantom/fcream/fcream");
const Tarot = require("./platforms/fantom/tarot/tarot");
const Fwaka = require("./platforms/fantom/fwaka/fwaka");
const Fhyperjump = require("./platforms/fantom/fhyperjump/fhyperjump");
const Fautofarm = require("./platforms/fantom/fautofarm/fautofarm");
const SpiritswapLend = require("./platforms/fantom/spiritswap/spiritswap_lend");
const SpiritswapDecorator = require("./platforms/fantom/spiritswap/spiritswap_decorator");
const Feleven = require("./platforms/fantom/feleven/feleven");
const Fjetswap = require("./platforms/fantom/fjetswap/fjetswap");
const Paintswap = require("./platforms/fantom/paintswap/paintswap");
const Fswamp = require("./platforms/fantom/fswamp/fswamp");
const Beethovenx = require("./platforms/fantom/beethovenx/beethovenx");
const Robovault = require("./platforms/fantom/robovault/robovault");

const Kuswap = require("./platforms/kcc/kuswap/kuswap");
const Kudex = require("./platforms/kcc/kudex/kudex");
const Kukafe = require("./platforms/kcc/kukafe/kukafe");
const KukafeCompound = require("./platforms/kcc/kukafe/kukafe_compound");
const KukafeDecorator = require("./platforms/kcc/kukafe/kukafe_decorator");
const Boneswap = require("./platforms/kcc/boneswap/boneswap");
const Scream = require("./platforms/fantom/scream/scream");

const Hbeefy = require("./platforms/harmony/hbeefy/hbeefy");
const Hsushi = require("./platforms/harmony/hsushi/hsushi");
const Openswap = require("./platforms/harmony/openswap/openswap");
const Viper = require("./platforms/harmony/viper/viper");
const Hcurve = require("./platforms/harmony/hcurve/hcurve");

const Ubeswap = require("./platforms/celo/ubeswap/ubeswap");
const Mobius = require("./platforms/celo/mobius/mobius");

let pancake;
let swamp;
let blizzard;
let hyperjump;
let slime;
let apeswap;
let goose;
let cheese;
let space;
let saltswap;
let mdex;
let pandayield;
let wault;
let cafeswap;
let belt;
let kebab;
let polaris;
let panther;
let jetswap;
let warden;
let biswap;
let evodefi;
let eleven;
let coinswap;
let beefy;
let treedefi;
let farmhero;
let alpaca;
let yieldparrot;
let alpha;
let honeyfarm;
let rabbit;
let qubit;
let cream;
let venus;
let fortress;
let fortube;
let bakery;
let planet;
let acryptos;
let pancakebunny;
let autofarm;
let jetfuel;
let valuedefi;
let jul;

let pwault;
let polycat;
let pjetswap;
let polyzap;
let augury;
let pswamp;
let ppancakebunny;
let mai;
let pfarmhero;
let polycrystal;
let mstable;
let dinoswap;
let pbeefy;
let pautofarm;
let dfyn;
let papeswap;
let psushi;
let pcurve;
let polycatCompound;
let polycatPaw;
let polycatDecorator;
let peleven;
let adamant;
let quickswap;
let pearzap;
let pelevenLeverage;
let pelevenDecorator;
let pcream;
let pfortube;
let balancer;
let impermax;

let spookyswap;
let spiritswap;
let spiritswapLend;
let liquiddriver;
let fbeefy;
let fcurve;
let ester;
let frankenstein;
let reaper;
let fcream;
let scream;
let tarot;
let fwaka;
let fhyperjump;
let fautofarm;
let spiritswapDecorator;
let feleven;
let fjetswap;
let paintswap;
let fswamp;
let beethovenx;
let robovault;

let kuswap;
let kudex;
let kukafe;
let boneswap;
let kukafeCompound;
let kukafeDecorator;

let hbeefy;
let hsushi;
let openswap;
let viper;
let hcurve;

let ubeswap;
let mobius;

let polygonPlatform;
let fantomPlatform;
let kccPlatform;
let harmonyPlatform;
let celoPlatform;

let crossPlatforms;

const _ = require("lodash");
const fs = require("fs");

module.exports = {
  Utils: require("./utils"),

  CONFIG: _.merge(
    JSON.parse(fs.readFileSync(path.resolve(__dirname, "../config.json"), "utf8")),
    fs.existsSync(path.resolve(__dirname, "../config.json.local")) ? JSON.parse(fs.readFileSync(path.resolve(__dirname, "../config.json.local"), "utf8")) : {}
  ),

  getDatabase() {
    if (database) {
      return database;
    }

    const myDb = Sqlite("db.db");
    myDb.pragma("journal_mode = WAL");
    myDb.pragma("SYNCHRONOUS = 1;");
    myDb.pragma("LOCKING_MODE = EXCLUSIVE;");

    return (database = myDb);
  },

  getCronjobs() {
    if (cronjobs) {
      return cronjobs;
    }

    return (cronjobs = new Cronjobs(
      this.getPlatforms(),
      this.getPriceOracle(),
      this.getPolygonPlatforms(),
      this.getPolygonPriceOracle(),
      this.getFantomPlatforms(),
      this.getFantomPriceOracle(),
      this.getFarmPlatformResolver(),
      this.getPolygonFarmPlatformResolver(),
      this.getFantomFarmPlatformResolver(),
      this.getKccPlatforms(),
      this.getKccPriceOracle(),
      this.getKccFarmPlatformResolver(),
      this.getHarmonyPlatforms(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyFarmPlatformResolver(),
      this.getCeloPlatforms(),
      this.getCeloPriceOracle(),
      this.getCeloFarmPlatformResolver(),
    ));
  },

  getFarmAuto() {
    if (farmAuto) {
      return farmAuto;
    }

    return (farmAuto = new FarmAuto(
      this.getPriceOracle(),
      this.getFarmFetcher(),
      this.getTokenCollector(),
      this.getCacheManager(),
      'bsc'
    ));
  },

  getPolygonFarmAuto() {
    if (polygonFarmAuto) {
      return polygonFarmAuto;
    }

    return (polygonFarmAuto = new FarmAuto(
      this.getPolygonPriceOracle(),
      this.getFarmFetcher(),
      this.getPolygonTokenCollector(),
      this.getPolygonCacheManager(),
      'polygon'
    ));
  },

  getFantomFarmAuto() {
    if (fantomFarmAuto) {
      return fantomFarmAuto;
    }

    return (fantomFarmAuto = new FarmAuto(
      this.getFantomPriceOracle(),
      this.getFarmFetcher(),
      this.getFantomTokenCollector(),
      this.getFantomCacheManager(),
      'fantom'
    ));
  },

  getPriceOracle() {
    if (priceOracle) {
      return priceOracle;
    }

    return (priceOracle = new PriceOracle(
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
      this.getPriceCollector(),
      this.getCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getPolygonPriceOracle() {
    if (polygonPriceOracle) {
      return polygonPriceOracle;
    }

    return (polygonPriceOracle = new PolygonPriceOracle(
      this.getPolygonTokenCollector(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonPriceCollector(),
      this.getPolygonCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getFantomPriceOracle() {
    if (fantomPriceOracle) {
      return fantomPriceOracle;
    }

    return (fantomPriceOracle = new FantomPriceOracle(
      this.getFantomTokenCollector(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomPriceCollector(),
      this.getFantomCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getKccPriceOracle() {
    if (kccPriceOracle) {
      return kccPriceOracle;
    }

    return (kccPriceOracle = new KccPriceOracle(
      this.getKccTokenCollector(),
      this.getKccLiquidityTokenCollector(),
      this.getKccPriceCollector(),
      this.getKccCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getHarmonyPriceOracle() {
    if (harmonyPriceOracle) {
      return harmonyPriceOracle;
    }

    return (harmonyPriceOracle = new HarmonyPriceOracle(
      this.getHarmonyTokenCollector(),
      this.getHarmonyLiquidityTokenCollector(),
      this.getHarmonyPriceCollector(),
      this.getHarmonyCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getCeloPriceOracle() {
    if (celoPriceOracle) {
      return celoPriceOracle;
    }

    return (celoPriceOracle = new CeloPriceOracle(
      this.getCeloTokenCollector(),
      this.getCeloLiquidityTokenCollector(),
      this.getCeloPriceCollector(),
      this.getCeloCacheManager(),
      this.getPriceFetcher(),
    ));
  },

  getPriceFetcher() {
    if (priceFetcher) {
      return priceFetcher;
    }

    return (priceFetcher = new PriceFetcher(
      this.getCacheManager(),
    ));
  },

  getFarmPlatformResolver() {
    if (farmPlatformResolver) {
      return farmPlatformResolver;
    }

    return (farmPlatformResolver = new FarmPlatformResolver(
      this.getCacheManager(),
    ));
  },

  getPolygonFarmPlatformResolver() {
    if (polygonFarmPlatformResolver) {
      return polygonFarmPlatformResolver;
    }

    return (polygonFarmPlatformResolver = new FarmPlatformResolver(
      this.getPolygonCacheManager(),
    ));
  },

  getFantomFarmPlatformResolver() {
    if (fantomFarmPlatformResolver) {
      return fantomFarmPlatformResolver;
    }

    return (fantomFarmPlatformResolver = new FarmPlatformResolver(
      this.getFantomCacheManager(),
    ));
  },

  getKccFarmPlatformResolver() {
    if (kccFarmPlatformResolver) {
      return kccFarmPlatformResolver;
    }

    return (kccFarmPlatformResolver = new FarmPlatformResolver(
      this.getKccCacheManager(),
    ));
  },

  getHarmonyFarmPlatformResolver() {
    if (harmonyFarmPlatformResolver) {
      return harmonyFarmPlatformResolver;
    }

    return (harmonyFarmPlatformResolver = new FarmPlatformResolver(
      this.getHarmonyCacheManager(),
    ));
  },

  getCeloFarmPlatformResolver() {
    if (celoFarmPlatformResolver) {
      return celoFarmPlatformResolver;
    }

    return (celoFarmPlatformResolver = new FarmPlatformResolver(
      this.getCeloCacheManager(),
    ));
  },

  getPlatforms() {
    if (platforms) {
      return platforms;
    }

    let folder = path.resolve(__dirname, "./platforms");
    return (platforms = new Platforms(
        [
          this.getPancake(),
          this.getBeefy(),
          this.getSwamp(),
          this.getBlizzard(),
          this.getHyperjump(),
          this.getSlime(),
          this.getApeswap(),
          this.getGoose(),
          this.getCheese(),
          this.getSpace(),
          this.getSaltswap(),
          this.getMdex(),
          this.getPandayield(),
          this.getWault(),
          this.getCafeswap(),
          this.getBelt(),
          this.getKebab(),
          this.getPolaris(),
          this.getPanther(),
          this.getJetswap(),
          this.getWarden(),
          this.getBiswap(),
          this.getEvodefi(),
          this.getEleven(),
          this.getCoinswap(),
          this.getTreedefi(),
          this.getFarmhero(),
          this.getAlpaca(),
          this.getYieldparrot(),
          this.getAlpha(),
          this.getHoneyfarm(),
          this.getRabbit(),
          this.getQubit(),
          this.getCream(),
          this.getVenus(),
          this.getFortress(),
          this.getFortube(),
          this.getBakery(),
          this.getPlanet(),
          this.getAcryptos(),
          this.getPancakebunny(),
          this.getAutofarm(),
          this.getJetfuel(),
          this.getValuedefi(),
          this.getJul(),
        ],
        this.getCache(),
        this.getPriceOracle(),
        this.getTokenCollector(),
        folder
    ));
  },

  getPolygonPlatforms() {
    if (polygonPlatform) {
      return polygonPlatform;
    }

    return (polygonPlatform = new Platforms(
      [
        this.getPwault(),
        this.getPolycatDecorator(),
        this.getPjetswap(),
        this.getPolyzap(),
        this.getAugury(),
        this.getPswamp(),
        this.getPpancakebunny(),
        this.getMai(),
        this.getPfarmhero(),
        this.getPolycrystal(),
        this.getMstable(),
        this.getDinoswap(),
        this.getPbeefy(),
        this.getPautofarm(),
        this.getDfyn(),
        this.getPapeswap(),
        this.getPsushi(),
        this.getPcurve(),
        this.getPelevenDecorator(),
        this.getAdamant(),
        this.getQuickswap(),
        this.getPearzap(),
        this.getPcream(),
        this.getPfortube(),
        this.getBalancer(),
        this.getImpermax(),
      ],
      this.getCache(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getFantomPlatforms() {
    if (fantomPlatform) {
      return fantomPlatform;
    }

    return (fantomPlatform = new Platforms(
      [
        this.getSpookyswap(),
        this.getSpiritswapDecorator(),
        this.getLiquiddriver(),
        this.getFbeefy(),
        this.getFcurve(),
        this.getEster(),
        this.getFrankenstein(),
        this.getReaper(),
        this.getFcream(),
        this.getScream(),
        this.getTarot(),
        this.getFwaka(),
        this.getFhyperjump(),
        this.getFautofarm(),
        this.getFeleven(),
        this.getFjetswap(),
        this.getPaintswap(),
        this.getFswamp(),
        this.getBeethovenx(),
        this.getRobovault(),
      ],
      this.getCache(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
    ));
  },

  getKccPlatforms() {
    if (kccPlatform) {
      return kccPlatform;
    }

    return (kccPlatform = new Platforms(
      [
        this.getKuswap(),
        this.getKudex(),
        this.getKukafeDecorator(),
        this.getBoneswap(),
      ],
      this.getCache(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
    ));
  },

  getHarmonyPlatforms() {
    if (harmonyPlatform) {
      return harmonyPlatform;
    }

    return (harmonyPlatform = new Platforms(
      [
        this.getHbeefy(),
        this.getHsushi(),
        this.getOpenswap(),
        this.getViper(),
        this.getHcurve(),
      ],
      this.getCache(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
    ));
  },

  getCeloPlatforms() {
    if (celoPlatform) {
      return celoPlatform;
    }

    return (celoPlatform = new Platforms(
      [
        this.getUbeswap(),
        this.getMobius(),
      ],
      this.getCache(),
      this.getCeloPriceOracle(),
      this.getCeloTokenCollector(),
    ));
  },

  getCrossPlatforms() {
    if (crossPlatforms) {
      return crossPlatforms;
    }

    return (crossPlatforms = new CrossPlatforms(
      [
        this.getPlatforms(),
        this.getPolygonPlatforms(),
        this.getFantomPlatforms(),
        this.getHarmonyPlatforms(),
        this.getCeloPlatforms(),
        this.getKccPlatforms(),
      ],
    ));
  },

  getPancake() {
    if (pancake) {
      return pancake;
    }

    return (pancake = new Pancake(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getSwamp() {
    if (swamp) {
      return swamp;
    }

    return (swamp = new Swamp(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPwault() {
    if (pwault) {
      return pwault;
    }

    return (pwault = new Pwault(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPolycat() {
    if (polycat) {
      return polycat;
    }

    return (polycat = new Polycat(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPolycatPaw() {
    if (polycatPaw) {
      return polycatPaw;
    }

    return (polycatPaw = new PolycatPaw(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPjetswap() {
    if (pjetswap) {
      return pjetswap;
    }

    return (pjetswap = new Pjetswap(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getFjetswap() {
    if (fjetswap) {
      return fjetswap;
    }

    return (fjetswap = new Fjetswap(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getPaintswap() {
    if (paintswap) {
      return paintswap;
    }

    return (paintswap = new Paintswap(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getPolyzap() {
    if (polyzap) {
      return polyzap;
    }

    return (polyzap = new Polyzap(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPearzap() {
    if (pearzap) {
      return pearzap;
    }

    return (pearzap = new Pearzap(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPolycatCompound() {
    if (polycatCompound) {
      return polycatCompound;
    }

    return (polycatCompound = new PolycatCompound(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getPolycatDecorator() {
    if (polycatDecorator) {
      return polycatDecorator;
    }

    return (polycatDecorator = new PolycatDecorator(
      this.getPolycat(),
      this.getPolycatCompound(),
      this.getPolycatPaw(),
    ));
  },

  getAugury() {
    if (augury) {
      return augury;
    }

    return (augury = new Augury(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPswamp() {
    if (pswamp) {
      return pswamp;
    }

    return (pswamp = new Pswamp(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getFswamp() {
    if (fswamp) {
      return fswamp;
    }

    return (fswamp = new Fswamp(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getViper() {
    if (viper) {
      return viper;
    }

    return (viper = new Viper(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
      this.getFarmFetcher(),
      this.getHarmonyCacheManager(),
    ));
  },

  getHcurve() {
    if (hcurve) {
      return hcurve;
    }

    return (hcurve = new Hcurve(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
    ));
  },

  getPancakebunny() {
    if (pancakebunny) {
      return pancakebunny;
    }

    return (pancakebunny = new Pancakebunny(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
    ));
  },

  getPpancakebunny() {
    if (ppancakebunny) {
      return ppancakebunny;
    }

    return (ppancakebunny = new Ppancakebunny(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getMai() {
    if (mai) {
      return mai;
    }

    return (mai = new Mai(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPfarmhero() {
    if (pfarmhero) {
      return pfarmhero;
    }

    return (pfarmhero = new Pfarmhero(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPolycrystal() {
    if (polycrystal) {
      return polycrystal;
    }

    return (polycrystal = new Polycrystal(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getDinoswap() {
    if (dinoswap) {
      return dinoswap;
    }

    return (dinoswap = new Dinoswap(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPapeswap() {
    if (papeswap) {
      return papeswap;
    }

    return (papeswap = new Papeswap(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getPsushi() {
    if (psushi) {
      return psushi;
    }

    return (psushi = new Psushi(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
    ));
  },

  getHsushi() {
    if (hsushi) {
      return hsushi;
    }

    return (hsushi = new Hsushi(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
      this.getFarmFetcher(),
      this.getHarmonyCacheManager(),
    ));
  },

  getOpenswap() {
    if (openswap) {
      return openswap;
    }

    return (openswap = new Openswap(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
      this.getFarmFetcher(),
      this.getHarmonyCacheManager(),
    ));
  },

  getPcurve() {
    if (pcurve) {
      return pcurve;
    }

    return (pcurve = new Pcurve(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getPbeefy() {
    if (pbeefy) {
      return pbeefy;
    }

    return (pbeefy = new Pbeefy(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getAutofarm() {
    if (autofarm) {
      return autofarm;
    }

    return (autofarm = new Autofarm(
      this.getCacheManager(),
      this.getPriceOracle(),
    ));
  },

  getJetfuel() {
    if (jetfuel) {
      return jetfuel;
    }

    return (jetfuel = new Jetfuel(
      this.getCacheManager(),
      this.getPriceOracle(),
    ));
  },

  getValuedefi() {
    if (valuedefi) {
      return valuedefi;
    }

    return (valuedefi = new Valuedefi(
      this.getCacheManager(),
      this.getPriceOracle(),
    ));
  },

  getJul() {
    if (jul) {
      return jul;
    }

    return (jul = new Jul(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
    ));
  },

  getPautofarm() {
    if (pautofarm) {
      return pautofarm;
    }

    return (pautofarm = new Pautofarm(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
    ));
  },

  getFautofarm() {
    if (fautofarm) {
      return fautofarm;
    }

    return (fautofarm = new Fautofarm(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
    ));
  },

  getDfyn() {
    if (dfyn) {
      return dfyn;
    }

    return (dfyn = new Dfyn(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getMstable() {
    if (mstable) {
      return mstable;
    }

    return (mstable = new Mstable(
      this.getCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getSpookyswap() {
    if (spookyswap) {
      return spookyswap;
    }

    return (spookyswap = new Spookyswap(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getFwaka() {
    if (fwaka) {
      return fwaka;
    }

    return (fwaka = new Fwaka(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getFhyperjump() {
    if (fhyperjump) {
      return fhyperjump;
    }

    return (fhyperjump = new Fhyperjump(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getSpiritswap() {
    if (spiritswap) {
      return spiritswap;
    }

    return (spiritswap = new Spiritswap(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getSpiritswapLend() {
    if (spiritswapLend) {
      return spiritswapLend;
    }

    return (spiritswapLend = new SpiritswapLend(
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getSpiritswapDecorator() {
    if (spiritswapDecorator) {
      return spiritswapDecorator;
    }

    return (spiritswapDecorator = new SpiritswapDecorator(
      this.getSpiritswap(),
      this.getSpiritswapLend(),
    ));
  },

  getLiquiddriver() {
    if (liquiddriver) {
      return liquiddriver;
    }

    return (liquiddriver = new Liquiddriver(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
    ));
  },

  getFbeefy() {
    if (fbeefy) {
      return fbeefy;
    }

    return (fbeefy = new Fbeefy(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
    ));
  },

  getFcurve() {
    if (fcurve) {
      return fcurve;
    }

    return (fcurve = new Fcurve(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
    ));
  },

  getEster() {
    if (ester) {
      return ester;
    }

    return (ester = new Ester(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getFrankenstein() {
    if (frankenstein) {
      return frankenstein;
    }

    return (frankenstein = new Frankenstein(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getReaper() {
    if (reaper) {
      return reaper;
    }

    return (reaper = new Reaper(
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getEvodefi() {
    if (evodefi) {
      return evodefi;
    }

    return (evodefi = new Evodefi(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getEleven() {
    if (eleven) {
      return eleven;
    }

    return (eleven = new Eleven(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
    ));
  },

  getPelevenDecorator() {
    if (pelevenDecorator) {
      return pelevenDecorator;
    }

    return (pelevenDecorator = new PelevenDecorator(
      this.getPeleven(),
      this.getPelevenLeverage(),
    ));
  },

  getPeleven() {
    if (peleven) {
      return peleven;
    }

    return (peleven = new Peleven(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getFarmFetcher(),
      this.getPolygonCacheManager(),
      this.getPolygonLiquidityTokenCollector(),
    ));
  },

  getPelevenLeverage() {
    if (pelevenLeverage) {
      return pelevenLeverage;
    }

    return (pelevenLeverage = new PelevenLeverage(
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonCacheManager(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getFeleven() {
    if (feleven) {
      return feleven;
    }

    return (feleven = new Feleven(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
    ));
  },

  getAdamant() {
    if (adamant) {
      return adamant;
    }

    return (adamant = new Adamant(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getQuickswap() {
    if (quickswap) {
      return quickswap;
    }

    return (quickswap = new Quickswap(
      this.getCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonLiquidityTokenCollector(),
    ));
  },

  getPolaris() {
    if (polaris) {
      return polaris;
    }

    return (polaris = new Polaris(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getBlizzard() {
    if (blizzard) {
      return blizzard;
    }

    return (blizzard = new Blizzard(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getHyperjump() {
    if (hyperjump) {
      return hyperjump;
    }

    return (hyperjump = new Hyperjump(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getSlime() {
    if (slime) {
      return slime;
    }

    return (slime = new Slime(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getApeswap() {
    if (apeswap) {
      return apeswap;
    }

    return (apeswap = new Apeswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getGoose() {
    if (goose) {
      return goose;
    }

    return (goose = new Goose(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getKebab() {
    if (kebab) {
      return kebab;
    }

    return (kebab = new Kebab(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getCheese() {
    if (cheese) {
      return cheese;
    }

    return (cheese = new Cheese(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getMdex() {
    if (mdex) {
      return mdex;
    }

    return (mdex = new Mdex(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getSpace() {
    if (space) {
      return space;
    }

    return (space = new Space(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPandayield() {
    if (pandayield) {
      return pandayield;
    }

    return (pandayield = new Pandayield(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getCafeswap() {
    if (cafeswap) {
      return cafeswap;
    }

    return (cafeswap = new Cafeswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getBelt() {
    if (belt) {
      return belt;
    }

    return (belt = new Belt(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getSaltswap() {
    if (saltswap) {
      return saltswap;
    }

    return (saltswap = new Saltswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getWault() {
    if (wault) {
      return wault;
    }

    return (wault = new Wault(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getPanther() {
    if (panther) {
      return panther;
    }

    return (panther = new Panther(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getWarden() {
    if (warden) {
      return warden;
    }

    return (warden = new Warden(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getBiswap() {
    if (biswap) {
      return biswap;
    }

    return (biswap = new Biswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getHoneyfarm() {
    if (honeyfarm) {
      return honeyfarm;
    }

    return (honeyfarm = new Honeyfarm(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getCoinswap() {
    if (coinswap) {
      return coinswap;
    }

    return (coinswap = new Coinswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getTreedefi() {
    if (treedefi) {
      return treedefi;
    }

    return (treedefi = new Treedefi(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getFarmhero() {
    if (farmhero) {
      return farmhero;
    }

    return (farmhero = new Farmhero(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getBeefy() {
    if (beefy) {
      return beefy;
    }

    return (beefy = new Beefy(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
    ));
  },

  getAlpaca() {
    if (alpaca) {
      return alpaca;
    }

    return (alpaca = new Alpaca(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getAlpha() {
    if (alpha) {
      return alpha;
    }

    return (alpha = new Alpha(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getFarmPlatformResolver(),
      this.getTokenCollector(),
    ));
  },

  getRabbit() {
    if (rabbit) {
      return rabbit;
    }

    return (rabbit = new Rabbit(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getQubit() {
    if (qubit) {
      return qubit;
    }

    return (qubit = new Qubit(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getCream() {
    if (cream) {
      return cream;
    }

    return (cream = new Cream(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getPcream() {
    if (pcream) {
      return pcream;
    }

    return (pcream = new Pcream(
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonCacheManager(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getScream() {
    if (scream) {
      return scream;
    }

    return (scream = new Scream(
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getBalancer() {
    if (balancer) {
      return balancer;
    }

    return (balancer = new Balancer(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
    ));
  },

  getBeethovenx() {
    if (beethovenx) {
      return beethovenx;
    }

    return (beethovenx = new Beethovenx(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFarmFetcher(),
    ));
  },

  getRobovault() {
    if (robovault) {
      return robovault;
    }

    return (robovault = new Robovault(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
    ));
  },

  getFcream() {
    if (fcream) {
      return fcream;
    }

    return (fcream = new Fcream(
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomFarmPlatformResolver(),
    ));
  },

  getTarot() {
    if (tarot) {
      return tarot;
    }

    return (tarot = new Tarot(
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFantomCacheManager(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomFarmPlatformResolver(),
      module.exports.CONFIG['DEFAULT_PROXY'] || undefined,
    ));
  },

  getImpermax() {
    if (impermax) {
      return impermax;
    }

    return (impermax = new Impermax(
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonCacheManager(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getVenus() {
    if (venus) {
      return venus;
    }

    return (venus = new Venus(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getFortress() {
    if (fortress) {
      return fortress;
    }

    return (fortress = new Fortress(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getBakery() {
    if (bakery) {
      return bakery;
    }

    return (bakery = new Bakery(
      this.getPriceOracle(),
      this.getCacheManager(),
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
    ));
  },

  getFortube() {
    if (fortube) {
      return fortube;
    }

    return (fortube = new Fortube(
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getCacheManager(),
      this.getLiquidityTokenCollector(),
      this.getFarmPlatformResolver(),
    ));
  },

  getPfortube() {
    if (pfortube) {
      return pfortube;
    }

    return (pfortube = new Pfortube(
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonCacheManager(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonFarmPlatformResolver(),
    ));
  },

  getYieldparrot() {
    if (yieldparrot) {
      return yieldparrot;
    }

    return (yieldparrot = new Yieldparrot(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
      this.getFarmPlatformResolver(),
    ));
  },

  getPlanet() {
    if (planet) {
      return planet;
    }

    return (planet = new Planet(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
      this.getFarmPlatformResolver(),
    ));
  },

  getAcryptos() {
    if (acryptos) {
      return acryptos;
    }

    return (acryptos = new Acryptos(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
    ));
  },

  getJetswap() {
    if (jetswap) {
      return jetswap;
    }

    return (jetswap = new Jetswap(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getFarmFetcher(),
      this.getCacheManager(),
    ));
  },

  getKuswap() {
    if (kuswap) {
      return kuswap;
    }

    return (kuswap = new Kuswap(
      this.getKccCacheManager(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getFarmFetcher(),
      this.getKccCacheManager(),
      this.getKccFarmPlatformResolver(),
    ));
  },

  getKudex() {
    if (kudex) {
      return kudex;
    }

    return (kudex = new Kudex(
      this.getKccCacheManager(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getFarmFetcher(),
      this.getKccCacheManager(),
      this.getKccFarmPlatformResolver(),
    ));
  },

  getKukafeDecorator() {
    if (kukafeDecorator) {
      return kukafeDecorator;
    }

    return (kukafeDecorator = new KukafeDecorator(
      this.getKukafe(),
      this.getKukafeCompound(),
    ));
  },

  getKukafe() {
    if (kukafe) {
      return kukafe;
    }

    return (kukafe = new Kukafe(
      this.getKccCacheManager(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getFarmFetcher(),
      this.getKccCacheManager(),
      this.getKccFarmPlatformResolver(),
    ));
  },

  getKukafeCompound() {
    if (kukafeCompound) {
      return kukafeCompound;
    }

    return (kukafeCompound = new KukafeCompound(
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getFarmFetcher(),
      this.getKccCacheManager(),
      this.getKccFarmPlatformResolver(),
    ));
  },

  getBoneswap() {
    if (boneswap) {
      return boneswap;
    }

    return (boneswap = new Boneswap(
      this.getKccCacheManager(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getFarmFetcher(),
      this.getKccCacheManager(),
      this.getKccFarmPlatformResolver(),
    ));
  },

  getHbeefy() {
    if (hbeefy) {
      return hbeefy;
    }

    return (hbeefy = new Hbeefy(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
    ));
  },

  getUbeswap() {
    if (ubeswap) {
      return ubeswap;
    }

    return (ubeswap = new Ubeswap(
      this.getCeloCacheManager(),
      this.getCeloPriceOracle(),
      this.getCeloTokenCollector(),
      this.getCeloLiquidityTokenCollector(),
    ));
  },

  getMobius() {
    if (mobius) {
      return mobius;
    }

    return (mobius = new Mobius(
      this.getCeloCacheManager(),
      this.getCeloPriceOracle(),
      this.getCeloTokenCollector(),
      this.getCeloLiquidityTokenCollector(),
    ));
  },

  getCache() {
    if (cache) {
      return cache;
    }

    return (cache = new Cache());
  },

  getAddressTransactions() {
    if (addressTransactions) {
      return addressTransactions;
    }

    return (addressTransactions = new AddressTransactions(
      this.getPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getLiquidityTokenCollector(),
      this.getTokenCollector(),
      this.getPriceCollector(),
    ));
  },

  getPolygonAddressTransactions() {
    if (polygonAddressTransactions) {
      return polygonAddressTransactions;
    }

    return (polygonAddressTransactions = new AddressTransactions(
      this.getPolygonPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonTokenCollector(),
      this.getPolygonPriceCollector(),
    ));
  },

  getFantomAddressTransactions() {
    if (fantomAddressTransactions) {
      return fantomAddressTransactions;
    }

    return (fantomAddressTransactions = new AddressTransactions(
      this.getFantomPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomTokenCollector(),
      this.getFantomPriceCollector(),
    ));
  },

  getKccAddressTransactions() {
    if (kccAddressTransactions) {
      return kccAddressTransactions;
    }

    return (kccAddressTransactions = new AddressTransactions(
      this.getKccPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getKccLiquidityTokenCollector(),
      this.getKccTokenCollector(),
      this.getKccPriceCollector(),
    ));
  },

  getHarmonyAddressTransactions() {
    if (harmonyAddressTransactions) {
      return harmonyAddressTransactions;
    }

    return (harmonyAddressTransactions = new AddressTransactions(
      this.getHarmonyPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getHarmonyLiquidityTokenCollector(),
      this.getHarmonyTokenCollector(),
      this.getHarmonyPriceCollector(),
    ));
  },

  getCeloAddressTransactions() {
    if (celoAddressTransactions) {
      return celoAddressTransactions;
    }

    return (celoAddressTransactions = new AddressTransactions(
      this.getCeloPlatforms(),
      this.getUserCacheManager(),
      this.getBscscanRequest(),
      this.getCeloLiquidityTokenCollector(),
      this.getCeloTokenCollector(),
      this.getCeloPriceCollector(),
    ));
  },

  getLiquidityTokenCollector() {
    if (liquidityTokenCollector) {
      return liquidityTokenCollector;
    }

    return (liquidityTokenCollector = new LiquidityTokenCollector(
      this.getCacheManager(),
    ));
  },

  getPolygonLiquidityTokenCollector() {
    if (polygonLiquidityTokenCollector) {
      return polygonLiquidityTokenCollector;
    }

    return (polygonLiquidityTokenCollector = new LiquidityTokenCollector(
      this.getPolygonCacheManager(),
    ));
  },

  getFantomLiquidityTokenCollector() {
    if (fantomLiquidityTokenCollector) {
      return fantomLiquidityTokenCollector;
    }

    return (fantomLiquidityTokenCollector = new LiquidityTokenCollector(
      this.getFantomCacheManager(),
    ));
  },

  getKccLiquidityTokenCollector() {
    if (kccLiquidityTokenCollector) {
      return kccLiquidityTokenCollector;
    }

    return (kccLiquidityTokenCollector = new LiquidityTokenCollector(
      this.getKccCacheManager(),
    ));
  },

  getHarmonyLiquidityTokenCollector() {
    if (harmonyLiquidityTokenCollector) {
      return harmonyLiquidityTokenCollector;
    }

    return (harmonyLiquidityTokenCollector = new LiquidityTokenCollector(
      this.getHarmonyCacheManager(),
    ));
  },

  getCeloLiquidityTokenCollector() {
    if (celoLiquidityTokenCollector) {
      return celoLiquidityTokenCollector;
    }

    return (celoLiquidityTokenCollector = new LiquidityTokenCollector(
      this.getCeloCacheManager(),
    ));
  },

  getCacheManager() {
    if (cacheManager) {
      return cacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return cacheManager = diskCache;
  },

  getPolygonCacheManager() {
    if (polygonCacheManager) {
      return polygonCacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache_polygon')

    const diskCache = cacheManagerInstance.caching({
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return polygonCacheManager = diskCache;
  },

  getFantomCacheManager() {
    if (fantomCacheManager) {
      return fantomCacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache_fantom')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return fantomCacheManager = diskCache;
  },

  getKccCacheManager() {
    if (kccCacheManager) {
      return kccCacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache_kcc')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return kccCacheManager = diskCache;
  },

  getHarmonyCacheManager() {
    if (harmonyCacheManager) {
      return harmonyCacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache_harmony')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return harmonyCacheManager = diskCache;
  },

  getCeloCacheManager() {
    if (celoCacheManager) {
      return celoCacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache_celo')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 24 * 30,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return celoCacheManager = diskCache;
  },

  getUserCacheManager() {
    if (cacheManager) {
      return cacheManager;
    }

    const cacheDir = path.resolve(__dirname, '../var/cache')

    const diskCache = cacheManagerInstance.caching({
      ignoreCacheErrors: true,
      store: fsStore,
      options: {
        path: cacheDir,
        ttl: 60 * 60 * 3,
        subdirs: true,
        zip: false,
      }
    });

    const fn = diskCache.get;

    diskCache.get = async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.error('error fetching cache: ', JSON.stringify(args))
      }

      return undefined
    }

    return cacheManager = diskCache;
  },

  getBalances() {
    if (balances) {
      return balances;
    }

    return (balances = new Balances(
      this.getCacheManager(),
      this.getPriceOracle(),
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
      'bsc'
    ));
  },

  getPolygonBalances() {
    if (polygonBalances) {
      return polygonBalances;
    }

    return (polygonBalances = new Balances(
      this.getPolygonCacheManager(),
      this.getPolygonPriceOracle(),
      this.getPolygonTokenCollector(),
      this.getPolygonLiquidityTokenCollector(),
      'polygon'
    ));
  },

  getFantomBalances() {
    if (fantomBalances) {
      return fantomBalances;
    }

    return (fantomBalances = new Balances(
      this.getFantomCacheManager(),
      this.getFantomPriceOracle(),
      this.getFantomTokenCollector(),
      this.getFantomLiquidityTokenCollector(),
      'fantom'
    ));
  },

  getKccBalances() {
    if (kccBalances) {
      return kccBalances;
    }

    return (kccBalances = new Balances(
      this.getKccCacheManager(),
      this.getKccPriceOracle(),
      this.getKccTokenCollector(),
      this.getKccLiquidityTokenCollector(),
      'kcc'
    ));
  },

  getHarmonyBalances() {
    if (harmonyBalances) {
      return harmonyBalances;
    }

    return (harmonyBalances = new Balances(
      this.getHarmonyCacheManager(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyTokenCollector(),
      this.getHarmonyLiquidityTokenCollector(),
      'harmony'
    ));
  },

  getCeloBalances() {
    if (celoBalances) {
      return celoBalances;
    }

    return (celoBalances = new Balances(
      this.getCeloCacheManager(),
      this.getCeloPriceOracle(),
      this.getCeloTokenCollector(),
      this.getCeloLiquidityTokenCollector(),
      'celo'
    ));
  },

  getTokenCollector() {
    if (tokenCollector) {
      return tokenCollector;
    }

    return (tokenCollector = new TokenCollector(this.getCacheManager(), 'bsc'));
  },

  getPolygonTokenCollector() {
    if (polygonTokenCollector) {
      return polygonTokenCollector;
    }

    return (polygonTokenCollector = new TokenCollector(this.getPolygonCacheManager(), 'polygon'));
  },

  getFantomTokenCollector() {
    if (fantomTokenCollector) {
      return fantomTokenCollector;
    }

    return (fantomTokenCollector = new TokenCollector(this.getFantomCacheManager(), 'fantom'));
  },

  getKccTokenCollector() {
    if (kccTokenCollector) {
      return kccTokenCollector;
    }

    return (kccTokenCollector = new TokenCollector(this.getKccCacheManager(), 'kcc'));
  },

  getHarmonyTokenCollector() {
    if (harmonyTokenCollector) {
      return harmonyTokenCollector;
    }

    return (harmonyTokenCollector = new TokenCollector(this.getHarmonyCacheManager(), 'harmony'));
  },

  getCeloTokenCollector() {
    if (celoTokenCollector) {
      return celoTokenCollector;
    }

    return (celoTokenCollector = new TokenCollector(this.getCeloCacheManager(), 'celo'));
  },

  getPriceCollector() {
    if (priceCollector) {
      return priceCollector;
    }

    return (priceCollector = new PriceCollector(this.getCacheManager()));
  },

  getPolygonPriceCollector() {
    if (polygonPriceCollector) {
      return polygonPriceCollector;
    }

    return (polygonPriceCollector = new PriceCollector(this.getPolygonCacheManager()));
  },

  getFantomPriceCollector() {
    if (fantomPriceCollector) {
      return fantomPriceCollector;
    }

    return (fantomPriceCollector = new PriceCollector(this.getFantomCacheManager()));
  },

  getKccPriceCollector() {
    if (kccPriceCollector) {
      return kccPriceCollector;
    }

    return (kccPriceCollector = new PriceCollector(this.getKccCacheManager()));
  },

  getHarmonyPriceCollector() {
    if (harmonyPriceCollector) {
      return harmonyPriceCollector;
    }

    return (harmonyPriceCollector = new PriceCollector(this.getHarmonyCacheManager()));
  },

  getCeloPriceCollector() {
    if (celoPriceCollector) {
      return celoPriceCollector;
    }

    return (celoPriceCollector = new PriceCollector(this.getCeloCacheManager()));
  },

  getDb() {
    if (db) {
      return db;
    }

    return (db = new Db(
      this.getDatabase(),
      this.getPriceOracle(),
      this.getPlatforms(),
      this.getPriceCollector(),
      this.getLiquidityTokenCollector(),
    ));
  },

  getPolygonDb() {
    if (polygonDb) {
      return polygonDb;
    }

    return (polygonDb = new Db(
      this.getDatabase(),
      this.getPolygonPriceOracle(),
      this.getPolygonPlatforms(),
      this.getPolygonPriceCollector(),
      this.getPolygonLiquidityTokenCollector(),
    ));
  },

  getFantomDb() {
    if (fantomDb) {
      return fantomDb;
    }

    return (fantomDb = new Db(
      this.getDatabase(),
      this.getFantomPriceOracle(),
      this.getFantomPlatforms(),
      this.getFantomPriceCollector(),
      this.getFantomLiquidityTokenCollector(),
    ));
  },

  getKccDb() {
    if (kccDb) {
      return kccDb;
    }

    return (kccDb = new Db(
      this.getDatabase(),
      this.getKccPriceOracle(),
      this.getKccPlatforms(),
      this.getKccPriceCollector(),
      this.getKccLiquidityTokenCollector(),
    ));
  },

  getHarmonyDb() {
    if (harmonyDb) {
      return harmonyDb;
    }

    return (harmonyDb = new Db(
      this.getDatabase(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyPlatforms(),
      this.getHarmonyPriceCollector(),
      this.getHarmonyLiquidityTokenCollector(),
    ));
  },

  getCeloDb() {
    if (celoDb) {
      return celoDb;
    }

    return (celoDb = new Db(
      this.getDatabase(),
      this.getCeloPriceOracle(),
      this.getCeloPlatforms(),
      this.getCeloPriceCollector(),
      this.getCeloLiquidityTokenCollector(),
    ));
  },

  getHttp() {
    if (http) {
      return http;
    }

    return (http = new Http(
      this.getPriceOracle(),
      this.getPlatforms(),
      this.getPolygonPlatforms(),
      this.getFantomPlatforms(),
      this.getKccPlatforms(),
      this.getHarmonyPlatforms(),
      this.getCeloPlatforms(),
      this.getCrossPlatforms(),
      this.getBalances(),
      this.getAddressTransactions(),
      this.getPolygonAddressTransactions(),
      this.getFantomAddressTransactions(),
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
      this.getTokenInfo(),
      this.getFarmAuto(),
      this.getPolygonPriceOracle(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonTokenCollector(),
      this.getPolygonBalances(),
      this.getPolygonTokenInfo(),
      this.getPolygonFarmAuto(),
      this.getFantomPriceOracle(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomTokenCollector(),
      this.getFantomBalances(),
      this.getFantomTokenInfo(),
      this.getFantomFarmAuto(),
      this.getKccPriceOracle(),
      this.getKccLiquidityTokenCollector(),
      this.getKccTokenCollector(),
      this.getKccBalances(),
      this.getKccTokenInfo(),
      this.getKccAddressTransactions(),
      this.getHarmonyPriceOracle(),
      this.getHarmonyLiquidityTokenCollector(),
      this.getHarmonyTokenCollector(),
      this.getHarmonyBalances(),
      this.getHarmonyTokenInfo(),
      this.getHarmonyAddressTransactions(),
      this.getCeloPriceOracle(),
      this.getCeloLiquidityTokenCollector(),
      this.getCeloTokenCollector(),
      this.getCeloBalances(),
      this.getCeloTokenInfo(),
      this.getCeloAddressTransactions()
    ));
  },

  getFarmFetcher() {
    if (farmFetcher) {
      return farmFetcher;
    }

    return (farmFetcher = new FarmFetcher(
      this.getContractAbiFetcher(),
    ));
  },

  getContractAbiFetcher() {
    if (contractAbiFetcher) {
      return contractAbiFetcher;
    }

    return (contractAbiFetcher = new ContractAbiFetcher(
      this.getBscscanRequest(),
      this.getCacheManager(),
    ));
  },

  getTokenInfo() {
    if (tokenInfo) {
      return tokenInfo;
    }

    return (tokenInfo = new TokenInfo(
      this.getCacheManager(),
      this.getTokenCollector(),
      this.getLiquidityTokenCollector(),
      this.getPriceCollector(),
      this.getDb(),
    ));
  },

  getPolygonTokenInfo() {
    if (polygonTokenInfo) {
      return polygonTokenInfo;
    }

    return (polygonTokenInfo = new TokenInfo(
      this.getPolygonCacheManager(),
      this.getPolygonTokenCollector(),
      this.getPolygonLiquidityTokenCollector(),
      this.getPolygonPriceCollector(),
      this.getPolygonDb(),
    ));
  },

  getFantomTokenInfo() {
    if (fantomTokenInfo) {
      return fantomTokenInfo;
    }

    return (fantomTokenInfo = new TokenInfo(
      this.getFantomCacheManager(),
      this.getFantomTokenCollector(),
      this.getFantomLiquidityTokenCollector(),
      this.getFantomPriceCollector(),
      this.getFantomDb(),
    ));
  },

  getKccTokenInfo() {
    if (kccTokenInfo) {
      return kccTokenInfo;
    }

    return (kccTokenInfo = new TokenInfo(
      this.getKccCacheManager(),
      this.getKccTokenCollector(),
      this.getKccLiquidityTokenCollector(),
      this.getKccPriceCollector(),
      this.getKccDb(),
    ));
  },

  getHarmonyTokenInfo() {
    if (harmonyTokenInfo) {
      return harmonyTokenInfo;
    }

    return (harmonyTokenInfo = new TokenInfo(
      this.getHarmonyCacheManager(),
      this.getHarmonyTokenCollector(),
      this.getHarmonyLiquidityTokenCollector(),
      this.getHarmonyPriceCollector(),
      this.getHarmonyDb(),
    ));
  },

  getCeloTokenInfo() {
    if (celoTokenInfo) {
      return celoTokenInfo;
    }

    return (celoTokenInfo = new TokenInfo(
      this.getCeloCacheManager(),
      this.getCeloTokenCollector(),
      this.getCeloLiquidityTokenCollector(),
      this.getCeloPriceCollector(),
      this.getCeloDb(),
    ));
  },

  getBscscanRequest() {
    if (bscscanRequest) {
      return bscscanRequest;
    }

    return (bscscanRequest = new BscscanRequest(
      module.exports.CONFIG['BSCSCAN_API_KEY'] || '',
      module.exports.CONFIG['POLYGONSCAN_API_KEY'] || '',
      module.exports.CONFIG['FANTOMSCAN_API_KEY'] || '',
      module.exports.CONFIG['CELOSCAN_API_KEY'] || '',
    ));
  },
};
