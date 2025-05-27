import { ApiReference } from '@scalar/nextjs-api-reference';

const config = {
  url: '/swagger.yaml',
};

export const GET = ApiReference(config);
