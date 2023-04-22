import {
  buildCollection,
  buildProperty,
  EntityReference,
  FirebaseCMSApp,
} from 'firecms';
import 'typeface-rubik';
import '@fontsource/ibm-plex-mono';
import { firebaseConfig } from './api/firebase';
import UseAuth from './hooks/useAuth';

type Product = {
  name: string;
  price: number;
  status: string;
  published: boolean;
  related_products: EntityReference[];
  main_image: string;
  tags: string[];
  description: string;
  categories: string[];
  publisher: {
    name: string;
    external_id: string;
  };
  expires_on: Date;
};

const localeCollection = buildCollection({
  path: 'locale',
  // customId: locales,
  name: 'Locales',
  singularName: 'Locales',
  properties: {
    name: {
      name: 'Title',
      validation: { required: true },
      dataType: 'string',
    },
    selectable: {
      name: 'Selectable',
      description: 'Is this locale selectable',
      dataType: 'boolean',
    },
    video: {
      name: 'Video',
      dataType: 'string',
      validation: { required: false },
      storage: {
        storagePath: 'videos',
        acceptedFiles: ['video/*'],
      },
    },
  },
});

const productsCollection1 = buildCollection<Product>({
  name: 'work',
  singularName: 'work',
  path: 'work',
  permissions: ({ authController }: { authController: any }) => ({
    edit: true,
    create: true,
    delete: false,
  }),
  properties: {
    categoryInfo: buildProperty({
      name: 'CategoryInfo',
      dataType: 'map',
      properties: {
        categoryId: {
          name: 'categoryId',
          description: '',
          validation: { required: true },
          dataType: 'string',
        },
        name: {
          name: 'name',
          description: '',
          validation: { required: true },
          dataType: 'string',
        },
        subCategory: {
          name: 'subCategory',
          description: '',
          validation: { required: true },
          dataType: 'array',
          of: buildProperty({
            dataType: 'map',
            properties: {
              categoryId: {
                name: 'categoryId',
                description: '',
                validation: { required: true },
                dataType: 'string',
              },
              name: {
                name: 'name',
                description: '',
                validation: { required: true },
                dataType: 'string',
              },
            },
          }),
        },
      },
    }),
    description: buildProperty({
      dataType: 'map',
      properties: {
        C01: {
          name: 'C01',
          description: '',
          validation: { required: true },
          dataType: 'string',
        },
        C02: {
          name: 'C02',
          description: '',
          validation: { required: true },
          dataType: 'string',
        },
      },
    }),
  },
});

const productsCollection2 = buildCollection<Product>({
  name: 'Products2',
  singularName: 'Products2',
  path: 'Products2',
  permissions: ({ authController }: { authController: any }) => ({
    edit: true,
    create: true,
    // we have created the roles object in the navigation builder
    delete: false,
  }),
  subcollections: [localeCollection],
  properties: {
    name: {
      name: 'Name',
      validation: { required: true },
      dataType: 'string',
    },
    price: {
      name: 'Price',
      validation: {
        required: true,
        requiredMessage: 'You must set a price between 0 and 1000',
        min: 0,
        max: 1000,
      },
      description: 'Price with range validation',
      dataType: 'number',
    },
    status: {
      name: 'Status',
      validation: { required: true },
      dataType: 'string',
      description: 'Should this product be visible in the website',
      longDescription:
        'Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.',
      enumValues: {
        private: 'Private',
        public: 'Public',
      },
    },
    published: ({ values }: { values: any }) =>
      buildProperty({
        name: 'Published',
        dataType: 'boolean',
        columnWidth: 100,
        disabled:
          values.status === 'public'
            ? false
            : {
                clearOnDisabled: true,
                disabledMessage:
                  'Status must be public in order to enable this the published flag',
              },
      }),
    related_products: {
      dataType: 'array',
      name: 'Related products',
      description: 'Reference to self',
      of: {
        dataType: 'reference',
        path: 'products',
      },
    },
    main_image: buildProperty({
      // The `buildProperty` method is a utility function used for type checking
      name: 'Image',
      dataType: 'string',
      storage: {
        storagePath: 'images',
        acceptedFiles: ['image/*'],
      },
    }),
    tags: {
      name: 'Tags',
      description: 'Example of generic array',
      validation: { required: true },
      dataType: 'array',
      of: {
        dataType: 'string',
      },
    },
    description: {
      name: 'Description',
      description: "Not mandatory but it'd be awesome if you filled this up",
      longDescription:
        'Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.',
      dataType: 'string',
      columnWidth: 300,
    },
    categories: {
      name: 'Categories',
      validation: { required: true },
      dataType: 'array',
      of: {
        dataType: 'string',
        enumValues: {
          electronics: 'Electronics',
          books: 'Books',
          furniture: 'Furniture',
          clothing: 'Clothing',
          food: 'Food',
        },
      },
    },
    publisher: {
      name: 'Publisher',
      description: 'This is an example of a map property',
      dataType: 'map',
      properties: {
        name: {
          name: 'Name',
          dataType: 'string',
        },
        external_id: {
          name: 'External id',
          dataType: 'string',
        },
      },
    },
    expires_on: {
      name: 'Expires on',
      dataType: 'date',
    },
  },
});

export default function App() {
  const myAuthenticator = UseAuth();

  return (
    <FirebaseCMSApp
      name={'NAMSAN'}
      authentication={myAuthenticator}
      collections={[productsCollection1, productsCollection2]}
      firebaseConfig={firebaseConfig}
    />
  );
}
