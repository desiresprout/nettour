import format from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';
import koLocale from 'date-fns/locale/ko';

export const Fromnow = (date) => {
        const now = new Date();
        const givenDate = new Date(date);
        const diff = now - givenDate;
        if (diff < 1000 * 60) { // 차이가 1분미만이면 방금전
            return '방금 전';
        }
        if (diff < 1000 * 60 * 60 * 24 * 5) {  // 5일 좀 안됨
            const distanceString = distanceInWords(now, givenDate, { locale: koLocale, addSuffix: true });
            return distanceString; // 5일전까진 몇일전 ~~으로 나오는코스
        }
     return format(givenDate, 'YYYY년 M월 D일');
}; 

export const Escapeurl = (url)=> {
    return url
      .replace(
        /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
        '',
      )
      .replace(/ /g, '-')    //공백 을 - 처리
      .replace(/--+/g, '-'); // -- 한번이상을 -처리
  };
