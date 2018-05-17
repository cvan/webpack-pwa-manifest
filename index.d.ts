// Type definitions for webpack-pwa-manifest 2.0.4
// Project: https://github.com/arthurbergmz/webpack-pwa-manifest
// Definitions by: Arthur A. Bergamaschi <https://www.github.com/arthurbergmz>

import { Plugin } from 'webpack';

export = WebpackPwaManifest

declare class WebpackPwaManifest extends Plugin {
    constructor(options: WebpackPwaManifest.ManifestOptions);
}

declare namespace WebpackPwaManifest {
    type Direction = 'ltr' | 'rtl' | 'auto';
    type Display = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
    type ImageResourcePurpose = 'badge' | 'any';
    type Orientation = 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | '';
    type ServiceWorkerRegistrationObjectType = 'module' | 'classic';
    type ServiceWorkerRegistrationObjectUpdateViaCache = 'imports' | 'none';
    interface ManifestOptions {
        background_color?: string;
        categories?: Array<string>;
        description?: string;
        dir?: Direction;
        display?: Display;
        filename?: string;
        gcm_sender_id?: string;
        iarc_rating_id?: string;
        icons?: ImageResource[];
        inject?: boolean;
        lang?: string;
        name: string;
        orientation?: Orientation;
        publicPath?: string;
        prefer_related_applications?: boolean;
        related_applications?: ExternalApplicationResource[];
        serviceworker?: ServiceWorkerRegistrationObject;
        scope?: string;
        screenshots?: ImageResource[];
        share_target?: ShareTarget;
        short_name?: string;
        start_url?: string;
        splash_screen_url?: string;
        supports_share?: boolean;
        theme_color?: string;
        'theme-color'?: string;
        ios?: boolean | IosOptions;
    }
    interface ExternalApplicationResource {
        fingerprints?: Fingerprint[];
        id?: string;
        min_version?: string;
        platform: string;
        url?: string;
    }
    interface Fingerprint {
        type: string;
        value: string;
    }
    interface IosOptions {
        'apple-touch-icon'?: string | IosAppleTouchIcon;
        'apple-touch-startup-image'?: string;
        'apple-mobile-web-app-title'?: string;
        'apple-mobile-web-app-capable'?: 'yes' | 'no' | boolean;
        'apple-mobile-web-app-status-bar-style'?: 'default' | 'black' | 'black-translucent';
    }
    interface IosAppleTouchIcon {
        sizes?: string | number;
        href: string;
    }
    interface ImageResource {
        destination?: string;
        ios?: boolean | 'default';
        purpose?: ImageResourcePurpose;
        size?: string | number;
        sizes?: string | number[];
        src: string;
        type?: string;
    }
    interface ServiceWorkerRegistrationObject {
      src: string;
      scope?: string;
      type?: ServiceWorkerRegistrationObjectType;
      update_via_cache?: ServiceWorkerRegistrationObjectUpdateViaCache;
    }
    interface ShareTarget {
        url_template: string;
    }
}
