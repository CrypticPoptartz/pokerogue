import { USE_SEASONAL_SPLASH_MESSAGES } from "#app/constants";

//#region Interfaces/Types

type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type Day =
  | Month
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

/**
 * Represents a season with its {@linkcode name},
 * {@linkcode start} day+month, {@linkcode end} day+month
 * and {@linkcode messages}.
 */
interface Season {
  /** The name of the season (internal use only) */
  name: string;
  /** The start day and month of the season. Format `MM-DD` */
  start: `${Month}-${Day}`;
  /** The end day and month of the season. Format `MM-DD` */
  end: `${Month}-${Day}`;
  /** Collection of the messages to display (without the `i18next.t()` call!) */
  messages: string[];
}

//#region Constants

/** The weight multiplier for the battles-won splash message */
const BATTLES_WON_WEIGHT_MULTIPLIER = 15;
/** The weight multiplier for the Pokémon names splash message */
const POKEMON_NAMES_WEIGHT_MULTIPLIER = 10;
/** The weight multiplier for the seasonal splash messages */
const SEASONAL_WEIGHT_MULTIPLIER = 15;

//#region Common Messages

const commonSplashMessages = [
  ...Array(BATTLES_WON_WEIGHT_MULTIPLIER).fill("battlesWon"),
  ...Array(POKEMON_NAMES_WEIGHT_MULTIPLIER).fill("underratedPokemon"),
  "Hi Buns!",
];

//#region Seasonal Messages

const seasonalSplashMessages: Season[] = [
  {
    name: "New Year's",
    start: "01-01",
    end: "01-15",
    messages: ["newYears.happyNewYear", "newYears.andAHappyNewYear"],
  },
  {
    name: "Valentines",
    start: "02-07",
    end: "02-21",
    messages: [
      "valentines.happyValentines",
      "valentines.fullOfLove",
      "valentines.applinForYou",
      "valentines.thePowerOfLoveIsThreeThirtyBST",
      "valentines.haveAHeartScale",
      "valentines.i<3You",
    ],
  },
  {
    name: "April Fools",
    start: "04-01",
    end: "04-03",
    messages: [
      "aprilFools.battlesOne",
      "aprilFools.aprilFools",
      "aprilFools.removedPokemon",
      "aprilFools.helloKyleAmber",
      "aprilFools.gotcha",
      "aprilFools.alsoTryPokerogueTwo",
      "aprilFools.nowWithSameScumCountermeasures",
      "aprilFools.neverGonnaGiveYouGoodRolls",
      "aprilFools.youBumblingBuffoon",
      "aprilFools.doubleShinyOddsForTrainersOnly",
      "aprilFools.nowWithZMoves",
      "aprilFools.newLightType",
      "aprilFools.removedMegas",
      "aprilFools.nerfedYourFavorites",
      "aprilFools.grrr",
      "aprilFools.enabledEternatusPassiveGoodLuck",
      "aprilFools.theDarkestDaySoundsLikeAFutureProblem",
      "aprilFools.tmShopWhen",
      "aprilFools.whoIsFinn",
      "aprilFools.watchOutForShadowPokemon",
      "aprilFools.nowWithDarkTypeLuxray",
      "aprilFools.onlyOnPokerogueNetAGAIN",
      "aprilFools.noFreeVouchers",
      "aprilFools.altffourAchievementPoints",
      "aprilFools.rokePogue",
      "aprilFools.readMe",
      "aprilFools.winningNotIncluded",
      "aprilFools.timeForYourSoloUnownRun",
      "aprilFools.nowARealTimeStrategyGame",
      "aprilFools.nowWithQuickTimeEncounters",
      "aprilFools.timeYourInputsForHigherCatchrate",
      "aprilFools.certifiedButtonSimulator",
      "aprilFools.iHopeYouGetSuckerPunched",
    ],
  },
  {
    name: "Halloween",
    start: "10-15",
    end: "10-31",
    messages: [
      "halloween.happyHalloween",
      "halloween.boo",
      "halloween.pumpkabooAbout",
      "halloween.mayContainSpiders",
      "halloween.spookyScarySkeledirge",
      "halloween.gourgeistUsedTrickOrTreat",
      "halloween.letsSnuggleForever",
    ],
  },
  {
    name: "Winter Holiday",
    start: "12-01",
    end: "12-31",
    messages: [
      "winterHoliday.happyHolidays",
      "winterHoliday.unaffilicatedWithDelibirdServices",
      "winterHoliday.delibirdSeason",
      "winterHoliday.diamondsFromTheSky",
      "winterHoliday.holidayStylePikachuNotIncluded",
      "winterHoliday.delibirdDirectlyToYourHouse",
      "winterHoliday.haveAnIceDay",
      "winterHoliday.spinTheClaydol",
      "winterHoliday.beGoodForGoodnessSake",
      "winterHoliday.moomooMilkAndLavaCookies",
      "winterHoliday.iNeedAYacheBerry",
      "winterHoliday.getJolly",
      "winterHoliday.tisTheSeasonToBeSpeSpa",
      "winterHoliday.deckTheHalls",
      "winterHoliday.saveScummingGetsYouOnTheNaughtyList",
      "winterHoliday.badTrainersGetRolycoly",
    ],
  },
];

//#endregion

export function getSplashMessages(): string[] {
  const splashMessages: string[] = [...commonSplashMessages];
  console.log("use seasonal splash messages", USE_SEASONAL_SPLASH_MESSAGES);
  if (USE_SEASONAL_SPLASH_MESSAGES) {
    // add seasonal splash messages if the season is active
    for (const { name, start, end, messages } of seasonalSplashMessages) {
      const now = new Date();
      const startDate = new Date(`${start}-${now.getFullYear()}`);
      const endDate = new Date(`${end}-${now.getFullYear()}`);

      if (now >= startDate && now <= endDate) {
        console.log(`Adding ${messages.length} ${name} splash messages (weight: x${SEASONAL_WEIGHT_MULTIPLIER})`);
        for (const message of messages) {
          const weightedMessage = Array(SEASONAL_WEIGHT_MULTIPLIER).fill(message);
          splashMessages.push(...weightedMessage);
        }
      }
    }
  }

  return splashMessages.map(message => `splashMessages:${message}`);
}
