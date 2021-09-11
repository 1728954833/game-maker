import { formatTimeLine } from '../format'
describe('format.test.ts', () => {
    it('formatTimeLine', () => {
        const f1 = formatTimeLine(120);
        expect(f1).toBe('02:00')

        const f2 = formatTimeLine(111);
        expect(f2).toBe('01:51')

        const f3 = formatTimeLine(120);
        expect(f3).toBe('02:00')

        const f4 = formatTimeLine(-1);
        expect(f4).toBe('00:00')

        const f5 = formatTimeLine(0);
        expect(f5).toBe('00:00')

        const f6 = formatTimeLine(1222);
        expect(f6).toBe('20:22')

        const f7 = formatTimeLine(122222, true);
        expect(f7).toBe('33:57:02')

        const f8 = formatTimeLine(122222);
        expect(f8).toBe('57:02')
    })
})