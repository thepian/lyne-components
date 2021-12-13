import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableCusHimAttributes } from './lyne-timetable-cus-him.custom.d';
import { i18nNone } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-cus-him.default.scss',
    shared: 'styles/lyne-timetable-cus-him.shared.scss'
  },
  tag: 'lyne-timetable-cus-him'
})

export class LyneTimetableCusHim {

  private _currentLanguage = getDocumentLang();

  /**
   * Stringified JSON to define the different outputs of the
   * occupancy predicition cell.
   * Format:
   * occupancyItems: [
   * {
   *    class: '1',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'low'
   * },
   * {
   *    class: '2',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'medium'
   *  }
   * ]
   */
  @Prop() public config!: string;

  /**
   * Variant of the Cus Him display,
   * can either be an icon only list
   * variant or a single icon with text
   */
  @Prop() public variant?: InterfaceLyneTimetableCusHimAttributes['variant'] = 'first-level-list';

  private _renderVariant(cusHimItems): JSX.Element {

    const cusHimItem = cusHimItems[0];

    /**
     * Let's check if we should render a list or
     * an individual message on level 2. Since
     * the former is more likely, we try to handle
     * this first. If we render early, we return
     * the markup early and do not reach the second
     * return after the if statement.
     */
    if (this.variant !== 'second-level-message') {

      if (cusHimItems.length === 1) {
        return (
          <span
            aria-label={cusHimItem.text}
            class='cus-him__icon'
            innerHTML={icons[cusHimItem.icon]}
            role='text'
            title={cusHimItem.text}
          ></span>
        )
      }

      return (
        <ul
          class='cus-him__list'
          role='list'
        > {
          cusHimItems.map(function (cusHimItem) {
            return (
              <li class='cus-him__list-item'>
                <span
                  aria-label={cusHimItem.text}
                  class='cus-him__icon'
                  innerHTML={icons[cusHimItem.icon]}
                  role='text'
                  title={cusHimItem.text}
                >
                </span>
              </li>
            )
          })
        }
        </ul>
      )
    }

    return (
      <p
        aria-label={cusHimItem.text}
        class='cus-him__second-level-message'
      >
        <span
          class='cus-him__icon'
          innerHTML={icons[cusHimItem.icon]}
          role='text'
          title={cusHimItem.text}
        >
        </span>
          <span class='cus-him__second-level-message-text'>
          {cusHimItem.text}
        </span>
      </p>
    )

  }

  public render(): JSX.Element {

    const {
      cusHimItems
    } = JSON.parse(this.config);

    const a11yLabel = i18nNone[this._currentLanguage];
    const variantClass = ` cus-him--${this.variant}`;

    return (
      <div class={`cus-him${variantClass}`}>
        {
          cusHimItems.length > 0
            ? this._renderVariant(cusHimItems)
            : <span class='cus-him__text--visually-hidden'>{a11yLabel}</span>
        }
      </div>
    );
  }
}
