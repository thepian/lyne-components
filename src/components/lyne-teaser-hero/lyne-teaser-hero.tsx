import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceImageAttributes } from '../lyne-image/lyne-image.custom.d';
import tokens from 'lyne-design-tokens/dist/js/tokens.json';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-teaser-hero.default.scss',
    shared: 'styles/lyne-teaser-hero.shared.scss'
  },
  tag: 'lyne-teaser-hero'
})

export class LyneTeaserHero {

  private _pictureSizesConfig = {
    breakpoints: [
      {
        image: {
          height: tokens['breakpoint-ultra-max'],
          width: tokens['breakpoint-ultra-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'min-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-ultra-min'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-wide-max'],
          width: tokens['breakpoint-wide-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-wide-max'
            },
            conditionOperator: false
          }
        ]
      },
      {
        image: {
          height: tokens['breakpoint-micro-max'],
          width: tokens['breakpoint-micro-max']
        },
        mediaQueries: [
          {
            conditionFeature: 'max-width',
            conditionFeatureValue: {
              lyneDesignToken: true,
              value: 'breakpoint-micro-max'
            },
            conditionOperator: false
          }
        ]
      }
    ]
  };

  /**
   * Text property for lyne-panel. See lyne-panel for additional info
   */
  @Prop() public text!: string;

  /**
   * Button text property for lyne-panel. See lyne-panel for additional info
   */
  @Prop() public buttonText!: string;

  /**
   * Image source property for lyne-image. See lyne-image for additional info
   */
  @Prop() public imageSrc!: string;

  /**
   * Image loading property. See lyne-image for additional info
   */
  @Prop() public imageLoading?: InterfaceImageAttributes['loading'] = 'eager';

  public render(): JSX.Element {
    return (
      <div class='taser-hero'>
        <lyne-image
          class='teaser-hero__image'
          pictureSizesConfig={JSON.stringify(this._pictureSizesConfig)}
          customFocalPoint={true}
          hideFromScreenreader={true}
          imageSrc={this.imageSrc}
          loading={this.imageLoading}
          lqip
          performanceMark='teaser-hero'
          variant='teaser-hero'
        ></lyne-image>

        <lyne-panel
          class='teaser-hero__panel'
          buttonText={this.buttonText}
          text={this.text}
        ></lyne-panel>
      </div>
    );
  }
}
