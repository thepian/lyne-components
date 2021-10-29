/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { InterfaceAccordionItemAttributes } from "./components/lyne-accordion-item/lyne-accordion-item.custom.d";
import { InterfaceButtonAttributes } from "./components/lyne-button/lyne-button.custom.d";
import { InterfaceImageAttributes } from "./components/lyne-image/lyne-image.custom.d";
import { InterfacePanelAttributes } from "./components/lyne-panel/lyne-panel.custom.d";
import { InterfacePearlChainAttributes } from "./components/lyne-pearl-chain/lyne-pearl-chain.custom.d";
import { Time } from "./components/lyne-sbb-clock/lyne-sbb-clock.custom.d";
import { InterfaceLogoAttributes } from "./components/lyne-sbb-logo/lyne-sbb-logo.custom.d";
import { InterfaceSignetAttributes } from "./components/lyne-sbb-signet/lyne-sbb-signet.custom.d";
import { InterfaceTitleAttributes } from "./components/lyne-title/lyne-title.custom.d";
export namespace Components {
    interface LyneAccordion {
        /**
          * Use the aria-labelledby to reference to an id of a title outside of the accordion. That way we can improve the context for the screenreader users. When the first button in the accordion receives focus, the referenced title is also spoken out by the screenreader.
         */
        "ariaLabelledby"?: string;
        /**
          * Set this if you want to use the accordion on a non-white background.
         */
        "nonWhiteBackground"?: boolean;
        /**
          * Set this if you want the accordion to always have open only one item.
         */
        "onlyOneOpen"?: boolean;
    }
    interface LyneAccordionItem {
        /**
          * If set, an accordion can not be toggled
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the event after opening/closing accordion
         */
        "eventId"?: string;
        /**
          * Text to show as title for the accordion.
         */
        "heading": string;
        /**
          * Heading level.
         */
        "headingLevel"?: InterfaceAccordionItemAttributes['level'];
        /**
          * Set to true to open the accordion item. Set to false to close it.
         */
        "open"?: boolean;
    }
    interface LyneButton {
        /**
          * If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.
         */
        "ariaHaspopup"?: InterfaceButtonAttributes['popup'];
        /**
          * Set to true to get a disabled button
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the click event payload
         */
        "eventId"?: string;
        /**
          * Define if icon should be shown or not
         */
        "icon"?: boolean;
        /**
          * If you use an icon without a label, you must provide an iconDescription
         */
        "iconDescription"?: string;
        /**
          * Label text to show on the button
         */
        "label"?: string;
        /**
          * The name attribute to use for the button
         */
        "name"?: string;
        /**
          * Size variant, either large or small.
         */
        "size"?: InterfaceButtonAttributes['size'];
        /**
          * The type attribute to use for the button
         */
        "type"?: InterfaceButtonAttributes['type'];
        /**
          * The value attribute to use for the button
         */
        "value"?: string;
        /**
          * Variant of the button, like primary, secondary etc.
         */
        "variant"?: InterfaceButtonAttributes['variant'];
        /**
          * Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered).
         */
        "visualButtonOnly"?: boolean;
    }
    interface LyneImage {
        /**
          * An alt text is not always necessary (e.g. in teaser cards when additional link text is provided). In this case we can leave the value of the alt attribute blank, but the attribute itself still needs to be present. That way we can signal assistive technology, that they can skip the image.
         */
        "alt"?: string;
        /**
          * A caption can provide additional context to the image (e.g. descriptions and the like). Links will automatically receive tabindex=-1 if hideFromScreenreader is set to true. That way they will no longer become focusable.
         */
        "caption"?: string;
        /**
          * If a copyright text is provided, we will add it to the caption and create a structured data json-ld block with the copyright information.
         */
        "copyright"?: string;
        /**
          * Copyright holder can either be an Organization or a Person
         */
        "copyrightHolder": InterfaceImageAttributes['copyrightHolder'];
        /**
          * Set this to true, if you want to pass a custom focal point for the image. See full documentation here: https://docs.imgix.com/apis/rendering/focalpoint-crop
         */
        "customFocalPoint": boolean;
        /**
          * If the lazy property is set to true, the module will automatically change the decoding to async, otherwise the decoding is set to auto which leaves the handling up to the browser. Read more about the decoding attribute here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
         */
        "decoding": InterfaceImageAttributes['decoding'];
        /**
          * Set this to true, to receive visual guideance where the custom focal point is currently set.
         */
        "focalPointDebug": boolean;
        /**
          * Pass in a floating number between 0 (left) and 1 (right).
         */
        "focalPointX": number;
        /**
          * Pass in a floating number between 0 (top) and 1 (bottom).
         */
        "focalPointY": number;
        /**
          * In cases when the image is just serving a decorative purpose, we can hide it from assistive technologies (e.g. an image in a teaser card)
         */
        "hideFromScreenreader": boolean;
        /**
          * Right now the module is heavily coupled with the image delivery service imgix and depends on the original files being stored inside of AEM. You can pass in any https://cdn.img.sbb.ch img src address you find on sbb.ch to play around with it. Just strip the url parameters and paste in the plain file address. If you want to know how to best work with this module with images coming from a different source, please contact the LYNE Core Team.
         */
        "imageSrc"?: string;
        /**
          * Just some example image file you can use to play around with the module.
         */
        "imageSrcExamples"?: string;
        /**
          * The importance attribute is fairly new attribute which should help the browser decide which resources it should prioritise during page load. We will set the attribute value based on the value, we receive in the loading attribute. 'eager', which we use for the largest image within the initial viewport, will set the attribute value to 'high'. 'lazy', which we use for images below the fold, will set the attribute value to 'low'.
         */
        "importance": InterfaceImageAttributes['importance'];
        /**
          * With the support of native image lazy loading, we can now decide whether we want to load the image immediately or only once it is close to the visible viewport. The value eager is best used for images within the initial viewport. We want to load these images as fast as possible to improve the Core Web Vitals values. lazy on the other hand works best for images which are further down the page or invisible during the loading of the initial viewport.
         */
        "loading": InterfaceImageAttributes['loading'];
        /**
          * If set to true, we show a blurred version of the image as placeholder before the actual image shows up. This will help to improve the perceived loading performance. Read more about the idea of lqip here: https://medium.com/@imgix/lqip-your-images-for-fast-loading-2523d9ee4a62
         */
        "lqip": boolean;
        /**
          * With performance.mark you can log a timestamp associated with the name you define in performanceMark when a certain event is happening. In our case we will log the performance.mark into the PerformanceEntry API once the image is fully loaded. Performance monitoring tools like SpeedCurve or Lighthouse are then able to grab these entries from the PerformanceEntry API and give us additional information and insights about our page loading behaviour. We are then also able to monitor these values over a long period to see if our performance increases or decreases over time. Best to use lowercase strings here, separate words with underscores or dashes.
         */
        "performanceMark"?: string;
        /**
          * With the pictureSizesConfig object, you can pass in information into image about what kind of source elements should get rendered. mediaQueries accepts multiple Media Query entries which can get combined by defining a conditionOperator. An example could look like this: {    "breakpoints": [      {        "image": {          "height": "675",          "width": "1200"        },        "mediaQueries": [          {            "conditionFeature": "min-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-large-min"            },            "conditionOperator": false          }        ]      },      {        "image": {          "height": "549",          "width": "976"        },        "mediaQueries": [          {            "conditionFeature": "min-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-small-min"            },            "conditionOperator": false          }        ]      },      {        "image": {          "height": "180",          "width": "320"        },        "mediaQueries": [          {            "conditionFeature": "max-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-micro-max"            },            "conditionOperator": "and"          },          {            "conditionFeature": "orientation",            "conditionFeatureValue": {              "lyneDesignToken": false,              "value": "landscape"            },            "conditionOperator": false          }        ]      }    ]  }
         */
        "pictureSizesConfig"?: string;
        /**
          * Based on the variant, we apply specific aspect ratios to the image accross all viewports.
         */
        "variant"?: InterfaceImageAttributes['variant'];
    }
    interface LyneLink {
        /**
          * The link text we want to visually show
         */
        "linkText": string;
    }
    interface LynePanel {
        /**
          * The text to use as button text
         */
        "buttonText": string;
        /**
          * Id which is sent in the click event payload for the button
         */
        "eventId"?: string;
        /**
          * The tag to use for the text element
         */
        "tag"?: InterfacePanelAttributes['tag'];
        /**
          * The text to show in the panel
         */
        "text": string;
    }
    interface LynePearlChain {
        /**
          * Per default, the current location has a pulsating animation. You can disable the animation with this property.
         */
        "disableAnimation"?: boolean;
        /**
          * Stringified JSON to define the legs of the pearl-chain. Format: `{"legs": [{"cancellation": true, "duration": 25}, ...]}` `duration`: number between 0 and 100. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. `cancellation`: if set, the leg will be marked as canceled.
         */
        "legs": string;
        /**
          * Define, if the pearl-chain represents a connection in the past, in the future or if it is a currently running connection. If it is currently running, provide a number between 0 and 100, which will represent the current location on the pearl-chain.
         */
        "status"?: InterfacePearlChainAttributes['status'];
    }
    interface LyneSbbClock {
        /**
          * initialTime accepts a string following a ${number}:${number}:${number} pattern. If left empty or the string 'now' is used we will set the current time the client has on its device.
         */
        "initialTime"?: Time;
        /**
          * If set to true, the clock will be paused.
         */
        "paused"?: boolean;
    }
    interface LyneSbbLogo {
        /**
          * The Logo needs to have a certain protective room around it
         */
        "protectiveRoom"?: InterfaceLogoAttributes['protectiveRoom'];
        /**
          * According to the Corporate Design Guidelines the logo can be used in these variants
         */
        "variant"?: InterfaceLogoAttributes['variant'];
    }
    interface LyneSbbSignet {
        /**
          * The Signet needs to have a certain protective room around it
         */
        "protectiveRoom"?: InterfaceSignetAttributes['protectiveRoom'];
        /**
          * According to the Corporate Design Guidelines the signet can be used in these variants
         */
        "variant"?: InterfaceSignetAttributes['variant'];
    }
    interface LyneTeaserHero {
        /**
          * Button text property for lyne-panel. See lyne-panel for additional info
         */
        "buttonText": string;
        /**
          * Image loading property. See lyne-image for additional info
         */
        "imageLoading"?: InterfaceImageAttributes['loading'];
        /**
          * Image source property for lyne-image. See lyne-image for additional info
         */
        "imageSrc": string;
        /**
          * Link to open if the teaser is clicked/pressed.
         */
        "link": string;
        /**
          * If `openInNewWindow` is set, you should provide according information which will be read aloud for screenreader users (e.g. "Link target will open in a new window").
         */
        "newWindowInfoText"?: string;
        /**
          * If set, the link will be opened in a new window.
         */
        "openInNewWindow"?: boolean;
        /**
          * Text property for lyne-panel. See lyne-panel for additional info
         */
        "text": string;
    }
    interface LyneTitle {
        /**
          * Title level
         */
        "level"?: InterfaceTitleAttributes['level'];
        /**
          * Text for the title
         */
        "text": string;
        /**
          * A11y Tip: Sometimes we need to set an id, especially if we want to associate a relationship with another element through the use of aria-labelledby or aria-describedby or just offer an anchor target
         */
        "titleId"?: '';
        /**
          * Visual level for the title. If you don't define the visual-level, the value for level will be used.
         */
        "visualLevel"?: InterfaceTitleAttributes['visualLevel'];
        /**
          * Sometimes we need a title in the markup to present a proper hierarchy to the screenreaders while we do not want to let that title appear visually. In this case we set visuallyHidden to true
         */
        "visuallyHidden"?: false;
    }
}
declare global {
    interface HTMLLyneAccordionElement extends Components.LyneAccordion, HTMLStencilElement {
    }
    var HTMLLyneAccordionElement: {
        prototype: HTMLLyneAccordionElement;
        new (): HTMLLyneAccordionElement;
    };
    interface HTMLLyneAccordionItemElement extends Components.LyneAccordionItem, HTMLStencilElement {
    }
    var HTMLLyneAccordionItemElement: {
        prototype: HTMLLyneAccordionItemElement;
        new (): HTMLLyneAccordionItemElement;
    };
    interface HTMLLyneButtonElement extends Components.LyneButton, HTMLStencilElement {
    }
    var HTMLLyneButtonElement: {
        prototype: HTMLLyneButtonElement;
        new (): HTMLLyneButtonElement;
    };
    interface HTMLLyneImageElement extends Components.LyneImage, HTMLStencilElement {
    }
    var HTMLLyneImageElement: {
        prototype: HTMLLyneImageElement;
        new (): HTMLLyneImageElement;
    };
    interface HTMLLyneLinkElement extends Components.LyneLink, HTMLStencilElement {
    }
    var HTMLLyneLinkElement: {
        prototype: HTMLLyneLinkElement;
        new (): HTMLLyneLinkElement;
    };
    interface HTMLLynePanelElement extends Components.LynePanel, HTMLStencilElement {
    }
    var HTMLLynePanelElement: {
        prototype: HTMLLynePanelElement;
        new (): HTMLLynePanelElement;
    };
    interface HTMLLynePearlChainElement extends Components.LynePearlChain, HTMLStencilElement {
    }
    var HTMLLynePearlChainElement: {
        prototype: HTMLLynePearlChainElement;
        new (): HTMLLynePearlChainElement;
    };
    interface HTMLLyneSbbClockElement extends Components.LyneSbbClock, HTMLStencilElement {
    }
    var HTMLLyneSbbClockElement: {
        prototype: HTMLLyneSbbClockElement;
        new (): HTMLLyneSbbClockElement;
    };
    interface HTMLLyneSbbLogoElement extends Components.LyneSbbLogo, HTMLStencilElement {
    }
    var HTMLLyneSbbLogoElement: {
        prototype: HTMLLyneSbbLogoElement;
        new (): HTMLLyneSbbLogoElement;
    };
    interface HTMLLyneSbbSignetElement extends Components.LyneSbbSignet, HTMLStencilElement {
    }
    var HTMLLyneSbbSignetElement: {
        prototype: HTMLLyneSbbSignetElement;
        new (): HTMLLyneSbbSignetElement;
    };
    interface HTMLLyneTeaserHeroElement extends Components.LyneTeaserHero, HTMLStencilElement {
    }
    var HTMLLyneTeaserHeroElement: {
        prototype: HTMLLyneTeaserHeroElement;
        new (): HTMLLyneTeaserHeroElement;
    };
    interface HTMLLyneTitleElement extends Components.LyneTitle, HTMLStencilElement {
    }
    var HTMLLyneTitleElement: {
        prototype: HTMLLyneTitleElement;
        new (): HTMLLyneTitleElement;
    };
    interface HTMLElementTagNameMap {
        "lyne-accordion": HTMLLyneAccordionElement;
        "lyne-accordion-item": HTMLLyneAccordionItemElement;
        "lyne-button": HTMLLyneButtonElement;
        "lyne-image": HTMLLyneImageElement;
        "lyne-link": HTMLLyneLinkElement;
        "lyne-panel": HTMLLynePanelElement;
        "lyne-pearl-chain": HTMLLynePearlChainElement;
        "lyne-sbb-clock": HTMLLyneSbbClockElement;
        "lyne-sbb-logo": HTMLLyneSbbLogoElement;
        "lyne-sbb-signet": HTMLLyneSbbSignetElement;
        "lyne-teaser-hero": HTMLLyneTeaserHeroElement;
        "lyne-title": HTMLLyneTitleElement;
    }
}
declare namespace LocalJSX {
    interface LyneAccordion {
        /**
          * Use the aria-labelledby to reference to an id of a title outside of the accordion. That way we can improve the context for the screenreader users. When the first button in the accordion receives focus, the referenced title is also spoken out by the screenreader.
         */
        "ariaLabelledby"?: string;
        /**
          * Set this if you want to use the accordion on a non-white background.
         */
        "nonWhiteBackground"?: boolean;
        /**
          * Set this if you want the accordion to always have open only one item.
         */
        "onlyOneOpen"?: boolean;
    }
    interface LyneAccordionItem {
        /**
          * If set, an accordion can not be toggled
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the event after opening/closing accordion
         */
        "eventId"?: string;
        /**
          * Text to show as title for the accordion.
         */
        "heading": string;
        /**
          * Heading level.
         */
        "headingLevel"?: InterfaceAccordionItemAttributes['level'];
        /**
          * Set to true to open the accordion item. Set to false to close it.
         */
        "open"?: boolean;
    }
    interface LyneButton {
        /**
          * If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.
         */
        "ariaHaspopup"?: InterfaceButtonAttributes['popup'];
        /**
          * Set to true to get a disabled button
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the click event payload
         */
        "eventId"?: string;
        /**
          * Define if icon should be shown or not
         */
        "icon"?: boolean;
        /**
          * If you use an icon without a label, you must provide an iconDescription
         */
        "iconDescription"?: string;
        /**
          * Label text to show on the button
         */
        "label"?: string;
        /**
          * The name attribute to use for the button
         */
        "name"?: string;
        /**
          * Size variant, either large or small.
         */
        "size"?: InterfaceButtonAttributes['size'];
        /**
          * The type attribute to use for the button
         */
        "type"?: InterfaceButtonAttributes['type'];
        /**
          * The value attribute to use for the button
         */
        "value"?: string;
        /**
          * Variant of the button, like primary, secondary etc.
         */
        "variant"?: InterfaceButtonAttributes['variant'];
        /**
          * Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered).
         */
        "visualButtonOnly"?: boolean;
    }
    interface LyneImage {
        /**
          * An alt text is not always necessary (e.g. in teaser cards when additional link text is provided). In this case we can leave the value of the alt attribute blank, but the attribute itself still needs to be present. That way we can signal assistive technology, that they can skip the image.
         */
        "alt"?: string;
        /**
          * A caption can provide additional context to the image (e.g. descriptions and the like). Links will automatically receive tabindex=-1 if hideFromScreenreader is set to true. That way they will no longer become focusable.
         */
        "caption"?: string;
        /**
          * If a copyright text is provided, we will add it to the caption and create a structured data json-ld block with the copyright information.
         */
        "copyright"?: string;
        /**
          * Copyright holder can either be an Organization or a Person
         */
        "copyrightHolder"?: InterfaceImageAttributes['copyrightHolder'];
        /**
          * Set this to true, if you want to pass a custom focal point for the image. See full documentation here: https://docs.imgix.com/apis/rendering/focalpoint-crop
         */
        "customFocalPoint"?: boolean;
        /**
          * If the lazy property is set to true, the module will automatically change the decoding to async, otherwise the decoding is set to auto which leaves the handling up to the browser. Read more about the decoding attribute here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
         */
        "decoding"?: InterfaceImageAttributes['decoding'];
        /**
          * Set this to true, to receive visual guideance where the custom focal point is currently set.
         */
        "focalPointDebug"?: boolean;
        /**
          * Pass in a floating number between 0 (left) and 1 (right).
         */
        "focalPointX"?: number;
        /**
          * Pass in a floating number between 0 (top) and 1 (bottom).
         */
        "focalPointY"?: number;
        /**
          * In cases when the image is just serving a decorative purpose, we can hide it from assistive technologies (e.g. an image in a teaser card)
         */
        "hideFromScreenreader"?: boolean;
        /**
          * Right now the module is heavily coupled with the image delivery service imgix and depends on the original files being stored inside of AEM. You can pass in any https://cdn.img.sbb.ch img src address you find on sbb.ch to play around with it. Just strip the url parameters and paste in the plain file address. If you want to know how to best work with this module with images coming from a different source, please contact the LYNE Core Team.
         */
        "imageSrc"?: string;
        /**
          * Just some example image file you can use to play around with the module.
         */
        "imageSrcExamples"?: string;
        /**
          * The importance attribute is fairly new attribute which should help the browser decide which resources it should prioritise during page load. We will set the attribute value based on the value, we receive in the loading attribute. 'eager', which we use for the largest image within the initial viewport, will set the attribute value to 'high'. 'lazy', which we use for images below the fold, will set the attribute value to 'low'.
         */
        "importance"?: InterfaceImageAttributes['importance'];
        /**
          * With the support of native image lazy loading, we can now decide whether we want to load the image immediately or only once it is close to the visible viewport. The value eager is best used for images within the initial viewport. We want to load these images as fast as possible to improve the Core Web Vitals values. lazy on the other hand works best for images which are further down the page or invisible during the loading of the initial viewport.
         */
        "loading"?: InterfaceImageAttributes['loading'];
        /**
          * If set to true, we show a blurred version of the image as placeholder before the actual image shows up. This will help to improve the perceived loading performance. Read more about the idea of lqip here: https://medium.com/@imgix/lqip-your-images-for-fast-loading-2523d9ee4a62
         */
        "lqip"?: boolean;
        /**
          * With performance.mark you can log a timestamp associated with the name you define in performanceMark when a certain event is happening. In our case we will log the performance.mark into the PerformanceEntry API once the image is fully loaded. Performance monitoring tools like SpeedCurve or Lighthouse are then able to grab these entries from the PerformanceEntry API and give us additional information and insights about our page loading behaviour. We are then also able to monitor these values over a long period to see if our performance increases or decreases over time. Best to use lowercase strings here, separate words with underscores or dashes.
         */
        "performanceMark"?: string;
        /**
          * With the pictureSizesConfig object, you can pass in information into image about what kind of source elements should get rendered. mediaQueries accepts multiple Media Query entries which can get combined by defining a conditionOperator. An example could look like this: {    "breakpoints": [      {        "image": {          "height": "675",          "width": "1200"        },        "mediaQueries": [          {            "conditionFeature": "min-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-large-min"            },            "conditionOperator": false          }        ]      },      {        "image": {          "height": "549",          "width": "976"        },        "mediaQueries": [          {            "conditionFeature": "min-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-small-min"            },            "conditionOperator": false          }        ]      },      {        "image": {          "height": "180",          "width": "320"        },        "mediaQueries": [          {            "conditionFeature": "max-width",            "conditionFeatureValue": {              "lyneDesignToken": true,              "value": "breakpoint-micro-max"            },            "conditionOperator": "and"          },          {            "conditionFeature": "orientation",            "conditionFeatureValue": {              "lyneDesignToken": false,              "value": "landscape"            },            "conditionOperator": false          }        ]      }    ]  }
         */
        "pictureSizesConfig"?: string;
        /**
          * Based on the variant, we apply specific aspect ratios to the image accross all viewports.
         */
        "variant"?: InterfaceImageAttributes['variant'];
    }
    interface LyneLink {
        /**
          * The link text we want to visually show
         */
        "linkText": string;
    }
    interface LynePanel {
        /**
          * The text to use as button text
         */
        "buttonText": string;
        /**
          * Id which is sent in the click event payload for the button
         */
        "eventId"?: string;
        /**
          * The tag to use for the text element
         */
        "tag"?: InterfacePanelAttributes['tag'];
        /**
          * The text to show in the panel
         */
        "text": string;
    }
    interface LynePearlChain {
        /**
          * Per default, the current location has a pulsating animation. You can disable the animation with this property.
         */
        "disableAnimation"?: boolean;
        /**
          * Stringified JSON to define the legs of the pearl-chain. Format: `{"legs": [{"cancellation": true, "duration": 25}, ...]}` `duration`: number between 0 and 100. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. `cancellation`: if set, the leg will be marked as canceled.
         */
        "legs": string;
        /**
          * Define, if the pearl-chain represents a connection in the past, in the future or if it is a currently running connection. If it is currently running, provide a number between 0 and 100, which will represent the current location on the pearl-chain.
         */
        "status"?: InterfacePearlChainAttributes['status'];
    }
    interface LyneSbbClock {
        /**
          * initialTime accepts a string following a ${number}:${number}:${number} pattern. If left empty or the string 'now' is used we will set the current time the client has on its device.
         */
        "initialTime"?: Time;
        /**
          * If set to true, the clock will be paused.
         */
        "paused"?: boolean;
    }
    interface LyneSbbLogo {
        /**
          * The Logo needs to have a certain protective room around it
         */
        "protectiveRoom"?: InterfaceLogoAttributes['protectiveRoom'];
        /**
          * According to the Corporate Design Guidelines the logo can be used in these variants
         */
        "variant"?: InterfaceLogoAttributes['variant'];
    }
    interface LyneSbbSignet {
        /**
          * The Signet needs to have a certain protective room around it
         */
        "protectiveRoom"?: InterfaceSignetAttributes['protectiveRoom'];
        /**
          * According to the Corporate Design Guidelines the signet can be used in these variants
         */
        "variant"?: InterfaceSignetAttributes['variant'];
    }
    interface LyneTeaserHero {
        /**
          * Button text property for lyne-panel. See lyne-panel for additional info
         */
        "buttonText": string;
        /**
          * Image loading property. See lyne-image for additional info
         */
        "imageLoading"?: InterfaceImageAttributes['loading'];
        /**
          * Image source property for lyne-image. See lyne-image for additional info
         */
        "imageSrc": string;
        /**
          * Link to open if the teaser is clicked/pressed.
         */
        "link": string;
        /**
          * If `openInNewWindow` is set, you should provide according information which will be read aloud for screenreader users (e.g. "Link target will open in a new window").
         */
        "newWindowInfoText"?: string;
        /**
          * If set, the link will be opened in a new window.
         */
        "openInNewWindow"?: boolean;
        /**
          * Text property for lyne-panel. See lyne-panel for additional info
         */
        "text": string;
    }
    interface LyneTitle {
        /**
          * Title level
         */
        "level"?: InterfaceTitleAttributes['level'];
        /**
          * Text for the title
         */
        "text": string;
        /**
          * A11y Tip: Sometimes we need to set an id, especially if we want to associate a relationship with another element through the use of aria-labelledby or aria-describedby or just offer an anchor target
         */
        "titleId"?: '';
        /**
          * Visual level for the title. If you don't define the visual-level, the value for level will be used.
         */
        "visualLevel"?: InterfaceTitleAttributes['visualLevel'];
        /**
          * Sometimes we need a title in the markup to present a proper hierarchy to the screenreaders while we do not want to let that title appear visually. In this case we set visuallyHidden to true
         */
        "visuallyHidden"?: false;
    }
    interface IntrinsicElements {
        "lyne-accordion": LyneAccordion;
        "lyne-accordion-item": LyneAccordionItem;
        "lyne-button": LyneButton;
        "lyne-image": LyneImage;
        "lyne-link": LyneLink;
        "lyne-panel": LynePanel;
        "lyne-pearl-chain": LynePearlChain;
        "lyne-sbb-clock": LyneSbbClock;
        "lyne-sbb-logo": LyneSbbLogo;
        "lyne-sbb-signet": LyneSbbSignet;
        "lyne-teaser-hero": LyneTeaserHero;
        "lyne-title": LyneTitle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "lyne-accordion": LocalJSX.LyneAccordion & JSXBase.HTMLAttributes<HTMLLyneAccordionElement>;
            "lyne-accordion-item": LocalJSX.LyneAccordionItem & JSXBase.HTMLAttributes<HTMLLyneAccordionItemElement>;
            "lyne-button": LocalJSX.LyneButton & JSXBase.HTMLAttributes<HTMLLyneButtonElement>;
            "lyne-image": LocalJSX.LyneImage & JSXBase.HTMLAttributes<HTMLLyneImageElement>;
            "lyne-link": LocalJSX.LyneLink & JSXBase.HTMLAttributes<HTMLLyneLinkElement>;
            "lyne-panel": LocalJSX.LynePanel & JSXBase.HTMLAttributes<HTMLLynePanelElement>;
            "lyne-pearl-chain": LocalJSX.LynePearlChain & JSXBase.HTMLAttributes<HTMLLynePearlChainElement>;
            "lyne-sbb-clock": LocalJSX.LyneSbbClock & JSXBase.HTMLAttributes<HTMLLyneSbbClockElement>;
            "lyne-sbb-logo": LocalJSX.LyneSbbLogo & JSXBase.HTMLAttributes<HTMLLyneSbbLogoElement>;
            "lyne-sbb-signet": LocalJSX.LyneSbbSignet & JSXBase.HTMLAttributes<HTMLLyneSbbSignetElement>;
            "lyne-teaser-hero": LocalJSX.LyneTeaserHero & JSXBase.HTMLAttributes<HTMLLyneTeaserHeroElement>;
            "lyne-title": LocalJSX.LyneTitle & JSXBase.HTMLAttributes<HTMLLyneTitleElement>;
        }
    }
}
