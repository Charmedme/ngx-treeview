/* tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ɵglobal as global } from '@angular/core';

/**
 * Jasmine matchers that check Angular specific conditions.
 */
export interface NgMatchers extends jasmine.Matchers<any> {
  not: NgMatchers;
  toBePromise(): boolean;
  toBeAnInstanceOf(expected: any): boolean;
  toHaveText(expected: string): boolean;
  toHaveTrimmedText(expected: string): boolean;
  toHaveCssClass(expected: string): boolean;
  toHaveCssStyle(expected: { [k: string]: string } | string): boolean;
  toImplement(expected: any): boolean;
  toContainError(expected: any): boolean;
  toHaveMap(expected: { [k: string]: any }): boolean;
}

const _global = (typeof window === 'undefined' ? global : window) as any;
const cssClassAliases: { [key: string]: string[] } = {
  'fa-expand': ['bi-arrows-angle-expand'],
  'fa-compress': ['bi-arrows-angle-contract'],
  'fa-caret-right': ['bi-caret-right-fill'],
  'fa-caret-down': ['bi-caret-down-fill']
};

export const expect: (actual: any) => NgMatchers = _global.expect;

// Some Map polyfills do not stringify maps in a useful way for Jasmine output.
(Map as any).prototype['jasmineToString'] = function () {
  const m = this;
  if (!m) {
    return '' + m;
  }
  const res: string[] = [];
  m.forEach((v: any, k: any) => {
    res.push(`${k}:${v}`);
  });
  return `{ ${res.join(',')} }`;
};

_global.beforeEach(() => {
  jasmine.addMatchers({
    toBePromise: () => ({
      compare: (actual: any) => {
        const pass = typeof actual === 'object' && typeof actual?.then === 'function';
        return { pass, message: `Expected ${actual} to be a promise` };
      }
    }),

    toBeAnInstanceOf: () => ({
      compare: (actual: any, expectedClass: any) => {
        const pass = typeof actual === 'object' && actual instanceof expectedClass;
        return { pass, message: `Expected ${actual} to be an instance of ${expectedClass}` };
      }
    }),

    toHaveText: () => ({
      compare: (actual: any, expectedText: string) => {
        const actualText = elementText(actual);
        return { pass: actualText === expectedText, message: `Expected ${actualText} to equal ${expectedText}` };
      }
    }),

    toHaveTrimmedText: () => ({
      compare: (actual: any, expectedText: string) => {
        const actualText = elementText(actual).trim();
        return { pass: actualText === expectedText, message: `Expected ${actualText} to equal ${expectedText}` };
      }
    }),

    toHaveCssClass: () => ({
      compare: (actual: any, className: string) => {
        const pass = hasCssClass(actual, className);
        return {
          pass,
          message: `Expected ${actual?.outerHTML ?? actual} to contain CSS class "${className}"`
        };
      },
      negativeCompare: (actual: any, className: string) => {
        const pass = !hasCssClass(actual, className);
        return {
          pass,
          message: `Expected ${actual?.outerHTML ?? actual} not to contain CSS class "${className}"`
        };
      }
    }),

    toHaveCssStyle: () => ({
      compare: (actual: any, styles: { [k: string]: string } | string) => {
        if (!(actual instanceof Element)) {
          return { pass: false, message: `Expected ${actual} to be an Element` };
        }
        const computed = window.getComputedStyle(actual);
        const pass = typeof styles === 'string'
          ? computed.getPropertyValue(styles).trim() !== ''
          : Object.keys(styles).every((prop) => computed.getPropertyValue(prop).trim() === styles[prop]);
        return {
          pass,
          message: `Expected ${actual.outerHTML} to contain style ${JSON.stringify(styles)}`
        };
      }
    }),

    toContainError: () => ({
      compare: (actual: any, expectedText: any) => {
        const errorMessage = actual?.toString?.() ?? `${actual}`;
        return {
          pass: errorMessage.indexOf(expectedText) > -1,
          message: `Expected ${errorMessage} to contain ${expectedText}`
        };
      }
    }),

    toImplement: () => ({
      compare: (actualObject: any, expectedInterface: any) => {
        const intProps = Object.keys(expectedInterface.prototype ?? {});
        const missedMethods = intProps.filter((k) => !actualObject?.constructor?.prototype?.[k]);
        return {
          pass: missedMethods.length === 0,
          message: `Expected ${actualObject} to have methods: ${missedMethods.join(', ')}`
        };
      }
    }),

    toHaveMap: () => ({
      compare: (actualObject: any, expected: { [k: string]: any }) => {
        let pass = true;
        let failureName = '';
        for (const propertyName in expected) {
          if (!isMatchProperties(expected[propertyName], actualObject?.[propertyName])) {
            pass = false;
            failureName = propertyName;
            break;
          }
        }
        return { pass, message: `Expected ${failureName} to match value` };
      }
    })
  });
});

function isMatchProperties(src: any, dest: any): boolean {
  if (dest instanceof Object) {
    for (const propertyName in dest) {
      if (!isMatchProperties(src?.[propertyName], dest[propertyName])) {
        return false;
      }
    }
    return true;
  }
  return src === dest;
}

function hasCssClass(node: any, className: string): boolean {
  if (!(node instanceof Element)) {
    return false;
  }

  const aliases = cssClassAliases[className] ?? [];
  const candidates = [className, ...aliases];
  return candidates.some((candidate) => {
    return node.classList.contains(candidate) || node.getElementsByClassName(candidate).length > 0;
  });
}

function elementText(node: any): string {
  if (node == null) {
    return '';
  }
  if (Array.isArray(node)) {
    return node.map(elementText).join('');
  }
  if (typeof Node !== 'undefined' && node.nodeType === Node.COMMENT_NODE) {
    return '';
  }
  if (typeof Node !== 'undefined' && node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
  }
  if (typeof ShadowRoot !== 'undefined' && node instanceof ShadowRoot) {
    return elementText(Array.from(node.childNodes));
  }
  if (node instanceof Element) {
    if (node.tagName === 'CONTENT') {
      return elementText(Array.from(node.childNodes));
    }
    const shadowRoot = (node as HTMLElement).shadowRoot;
    if (shadowRoot) {
      return elementText(shadowRoot);
    }
    return elementText(Array.from(node.childNodes));
  }
  if (node.childNodes) {
    return elementText(Array.from(node.childNodes));
  }
  return node.textContent ?? `${node}`;
}
