import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import Text from '@/components/Text';
import horse from '@/public/aboutMe/horse.jpeg';
import photoMe from '@/public/aboutMe/photo-me.jpg';
import ski from '@/public/aboutMe/ski.jpg';
import travel from '@/public/aboutMe/travel.jpg';

import styles from './page.module.scss';

type hobbiesType = {
  name: string;
  photo: StaticImageData;
};

const About: React.FC = () => {
  const hobbies: hobbiesType[] = [
    { name: 'Горные лыжи', photo: ski },
    { name: 'Верховая езда', photo: horse },
    { name: 'Путешествия', photo: travel },
  ];

  return (
    <div className={styles.about}>
      <div className={styles.about__header}>
        <Image className={styles.about__mainPhoto} src={photoMe} alt={'Фотография Лены'} />
        <div className={styles.about__mission}>
          <Text view="title" color="accent" weight="bold">
            Искусство в каждой петельке
          </Text>
          <Text view="p-l">
            Привет! Меня зовут Лена, и я создала этот проект, чтобы доказать: вязание — это не
            просто хобби, а современное искусство, доступное каждому. Моя цель — создавать
            максимально подробные и понятные видеоуроки, которые помогут вам пройти путь от первой
            петли до готового изделия с удовольствием.
          </Text>
        </div>
      </div>

      <div className={styles.about__hobbies}>
        <Text view="p-xl" weight="bold" color="accent">
          Немного обо мне
        </Text>
        <Text view="p-m">
          Я верю, что во всем важен баланс. Вязание учит меня терпению и вниманию к деталям, а мои
          увлечения вне экрана — драйву и решительности.
        </Text>

        <div className={styles.about__container}>
          {hobbies.map((hobby) => (
            <div key={hobby.name} className={styles[`about__container-element`]}>
              <Image
                className={styles.about__photo}
                src={hobby.photo}
                alt={`Фотография хобби - ${hobby.name}`}
              />
              <Text view="p-l" color="accent" weight="medium">
                {hobby.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
