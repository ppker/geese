import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
import { VscClose } from 'react-icons/vsc';

import { redirectRecord } from '@/services/home';

import { AdvertItem } from '@/types/home';

const ImageURL =
  'https://img.hellogithub.com/article/HwsoJXEiYdPhjLa_1720773908.png';

interface Props {
  data: AdvertItem;
  className?: string;
  t: (key: string) => string;
  i18n_lang?: string;
}

interface AdContentProps {
  t: (key: string) => string;
  data: AdvertItem;
}

interface ImageAdContentProps {
  data: AdvertItem;
  handleClose: MouseEventHandler<HTMLDivElement>;
}

const ImageAdContent = ({ data, handleClose }: ImageAdContentProps) => (
  <div className='group relative h-full'>
    <img className='h-full w-full' src={data.image_url} alt='ad' />
    <div
      className='absolute top-0 right-0 hidden cursor-pointer p-1.5 text-inherit opacity-30 group-hover:block'
      onClick={handleClose}
    >
      <VscClose size={20} />
    </div>
  </div>
);

export default function Ad({ data, className, t, i18n_lang }: Props) {
  const [visible, setVisible] = useState(true);

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  const onClickLink = (aid: string) => {
    redirectRecord('', aid, 'ad');
  };

  if (!visible) return null;

  const ProgressBar = ({ percent }: { percent: number }) => (
    <div className='flex h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700'>
      <div
        className='flex flex-col justify-center overflow-hidden bg-blue-500'
        style={{ width: `${percent}%` }}
      />
    </div>
  );

  const AdTargetInfo = ({ data, t }: AdContentProps) => (
    <div className='mt-1.5 mb-1 text-xs text-gray-500'>
      <span>
        {data.year ? t('advert.next2') : t('advert.next')}
        <strong className='mx-1'>{100 - data.percent}%</strong>
      </span>
      <ProgressBar percent={data.percent} />
    </div>
  );

  const AdServerInfo = ({ data, t }: AdContentProps) => (
    <div className='mt-1.5 mb-1 text-xs text-gray-500'>
      <span>
        {t('advert.desc')}
        <strong className='mx-1'>{data.day}</strong>
        {t('advert.day')}
      </span>
      <div className='relative left-0.5 bottom-1 inline-flex w-fit'>
        <span className='text-xs font-medium text-blue-500'>
          <span className='mr-[0.5px]'>+{data.year}</span>
          {t('advert.year')}
        </span>
      </div>
      <ProgressBar percent={data.percent} />
    </div>
  );

  const RewardAdContent = ({ data, t }: AdContentProps) => (
    <div className='group flex flex-row p-3'>
      <img
        className='h-[55px] w-[55px]'
        src={i18n_lang == 'en' ? ImageURL : data.image_url}
        alt='ad'
      />
      <div className='ml-3'>
        <div className='font-medium tracking-wider md:text-sm lg:w-[135px] lg:truncate lg:whitespace-nowrap lg:text-base'>
          {t('advert.desc2')}
        </div>
        <div className='hidden lg:block'>
          <div className='group-hover:hidden'>
            <AdServerInfo data={data} t={t} />
          </div>
          <div className='hidden group-hover:block'>
            <AdTargetInfo data={data} t={t} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative h-20 overflow-hidden rounded-lg bg-white dark:bg-gray-800 ${className}`}
    >
      <Link href={data.url}>
        <a
          target='_blank'
          onClick={() => onClickLink(data.aid)}
          rel='noreferrer'
        >
          {data.is_reward ? (
            <RewardAdContent data={data} t={t} />
          ) : (
            <ImageAdContent data={data} handleClose={handleClose} />
          )}
        </a>
      </Link>
    </div>
  );
}
