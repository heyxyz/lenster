import { STATIC_IMAGES_URL } from '@lenster/data/constants';
import { PublicationMetadataMainFocusType } from '@lenster/lens';
import { describe, expect, test } from 'vitest';

import getThumbnailUrl from './getThumbnailUrl';

describe('getThumbnailUrl', () => {
  const mockMetadata: any = {
    media: [],
    tags: [],
    mainContentFocus: PublicationMetadataMainFocusType.Article,
    cover: {
      raw: { uri: 'https://example.com/cover.png' },
      optimized: { uri: null }
    }
  };

  test('should return an thumbnail if no metadata is provided', () => {
    const metadata = undefined;
    const result = getThumbnailUrl(metadata);
    const expectedUrl = `${STATIC_IMAGES_URL}/thumbnail.png`;
    expect(result).toEqual(expectedUrl);
  });

  test('should return the original cover URL if available', () => {
    const metadata = mockMetadata;
    const result = getThumbnailUrl(metadata);
    expect(result).toEqual('https://example.com/cover.png');
  });

  test('should return the image URL if no original cover URL is available', () => {
    const metadata = { ...mockMetadata, cover: undefined };
    const result = getThumbnailUrl(metadata);
    const expectedUrl = `${STATIC_IMAGES_URL}/thumbnail.png`;
    expect(result).toEqual(expectedUrl);
  });
});
