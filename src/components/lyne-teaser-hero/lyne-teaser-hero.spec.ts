import { LyneTeaserHero } from './lyne-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTeaserHero],
      html: '<lyne-teaser-hero></lyne-teaser-hero>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-teaser-hero>
          <mock:shadow-root>
            <div class="taser-hero">
              <lyne-image class="teaser-hero__image" customfocalpoint="" hidefromscreenreader="" imagesrc="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg" loading="eager" lqip="" performancemark="" picturesizesconfig="{&quot;breakpoints&quot;:[{&quot;image&quot;:{&quot;height&quot;:2579,&quot;width&quot;:2579},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;min-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-ultra-min&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:1439,&quot;width&quot;:1439},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-wide-max&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:1279,&quot;width&quot;:1279},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-large-max&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:1023,&quot;width&quot;:1023},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-medium-max&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:839,&quot;width&quot;:839},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-small-max&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:599,&quot;width&quot;:599},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-micro-max&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:359,&quot;width&quot;:359},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;breakpoint-zero-max&quot;},&quot;conditionOperator&quot;:false}]}]}" variant="teaser-hero"></lyne-image>
              <lyne-panel buttontext="Sample button text" class="teaser-hero__panel" text="Sample panel text"></lyne-panel>
            </div>
          </mock:shadow-root>
        </lyne-teaser-hero>
      `);
  });

});
