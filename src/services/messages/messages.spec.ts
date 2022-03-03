import { getCharacters, getEmojis, getNouns, getNumbers, getResponseTimes, getVerbs, getWords } from '../../utils/utils';

describe('Testing Utility to count data', () => {
  it('should return correct characters for getCharacters', () => {
    const totalCharCount = getCharacters('Is there a particular app that seems to cause these issues more than others? What model iPhone are you using? Join us in DM.');
    expect(totalCharCount).toEqual(124);
  });

  it('should return correct no. of words for getWords', () => {
    const totalCharCount = getWords('Is there a particular app that seems to cause these issues more than others? What model iPhone are you using? Join us in DM.');
    expect(totalCharCount).toEqual(24);
  });

  it('should return correct no. of nouns for getNouns', () => {
    const totalCharCount = getNouns('Is there a particular app that seems to cause these issues more than others? What model iPhone are you using? Join us in DM.');
    expect(totalCharCount).toEqual(5);
  });

  it('should return correct no. of verbs for getVerbs', () => {
    const totalCharCount = getVerbs('Is there a particular app that seems to cause these issues more than others? What model iPhone are you using? Join us in DM.');
    expect(totalCharCount).toEqual(6);
  });

  it('should return correct response time for getResponseTimes', () => {
    let nodes = [
      {
        id: 'cky905qcp367560fmlux0z6k8t',
        text: 'Is there a particular app that seems to cause these issues more than others? What model iPhone are you using? Join us in DM.',
        createdAt: '2022-01-10T19:49:59.960Z',
      },
      { id: 'cky905qse368130fml7ztjupaq', text: 'I have the latest version iOS. It started immediately after I updated my phone.', createdAt: '2022-01-10T19:50:50.862Z' },
      {
        id: 'cky905r8j368690fmlvzcah51q',
        text: "We'd like to help if we can. When did this start happening? Which version of iOS are you running currently?",
        createdAt: '2022-01-10T19:52:52.012Z',
      },
    ];

    const totalCharCount = getResponseTimes(nodes);
    expect(totalCharCount).toEqual([50902, 121150]);
  });

  it('should return correct no. of Numbers for getNumbers', () => {
    const totalCharCount = getNumbers(
      'hanks! Version 8.4.22.857 armv7 on anker bluetooth speaker on Samsung Galaxy Tab A (2016) Model SM-T280 Does distance from speaker matter? i love the idea of putting atleast 1 number in this text'
    );
    expect(totalCharCount).toEqual(1);
  });

  it('should return correct no. of Emojis for getEmojis', () => {
    const totalCharCount = getEmojis('causing the reply to be disregarded and the tapped notification under the keyboard is opened😡😡😡');
    expect(totalCharCount).toEqual(3);
  });
});
