import { buildCollection, buildProperty } from 'firecms';

type TEducations = {
  value: string;
}[];

type TCarrers = {
  time: string;
  value: string;
}[];

type TMembers = {
  bgImagePath: string;
  businessFields: string[];
  careers: TCarrers;
  description: string;
  descriptionPreview?: string;
  educations: TEducations;
  email: string;
  id: string;
  imagePath: string;
  language: string;
  name: string;
  order: number;
  position: string;
};

const Members = buildCollection<TMembers>({
  name: 'members',
  singularName: 'members',
  path: 'members',
  permissions: ({ authController }: { authController: any }) => ({
    edit: true,
    create: true,
    delete: true,
  }),
  customId: false,
  properties: {
    id: {
      name: '유니크아이디 (자동생성된 id와 동일하게 사용)',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    order: {
      name: '순서',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    name: {
      name: '이름',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    position: {
      name: '직책',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    description: {
      name: '설명',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    descriptionPreview: {
      name: '설명 짧은버전',
      description: '',
      validation: { required: false },
      dataType: 'string',
    },
    email: {
      name: '이메일',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
    businessFields: {
      name: '업무분야',
      dataType: 'array',
      of: buildProperty({
        dataType: 'string',
        validation: { required: true },
      }),
    },
    imagePath: buildProperty({
      name: '이미지',
      dataType: 'string',
      description: '',
      storage: {
        storagePath: 'members',
        acceptedFiles: ['members/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    bgImagePath: buildProperty({
      name: '배경이미지',
      dataType: 'string',
      description: '',
    }),
    careers: {
      name: '자격 및 경력',
      description: '',
      validation: { required: true },
      dataType: 'array',
      of: buildProperty({
        dataType: 'map',
        properties: {
          time: {
            name: 'time',
            description: '',
            validation: { required: false },
            dataType: 'string',
          },
          value: {
            name: 'value',
            description: '',
            validation: { required: true },
            dataType: 'string',
          },
        },
      }),
    },
    educations: {
      name: '학력',
      description: '',
      validation: { required: true },
      dataType: 'array',
      of: buildProperty({
        dataType: 'map',
        properties: {
          time: {
            name: 'time',
            description: '',
            validation: { required: false },
            dataType: 'string',
          },
          value: {
            name: 'value',
            description: '',
            validation: { required: true },
            dataType: 'string',
          },
        },
      }),
    },
    awards: {
      name: '수상',
      description: '',
      validation: { required: false },
      dataType: 'array',
      of: buildProperty({
        dataType: 'map',
        properties: {
          time: {
            name: 'time',
            description: '',
            validation: { required: false },
            dataType: 'string',
          },
          value: {
            name: 'value',
            description: '',
            validation: { required: true },
            dataType: 'string',
          },
        },
      }),
    },
    papers: {
      name: '논문',
      description: '',
      validation: { required: false },
      dataType: 'array',
      of: buildProperty({
        dataType: 'map',
        properties: {
          time: {
            name: 'time',
            description: '',
            validation: { required: false },
            dataType: 'string',
          },
          value: {
            name: 'value',
            description: '',
            validation: { required: true },
            dataType: 'string',
          },
        },
      }),
    },
    language: {
      name: '언어',
      description: '',
      validation: { required: true },
      dataType: 'string',
    },
  },
});

export default Members;
