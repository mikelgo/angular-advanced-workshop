import {debounceTime, interval, Observable, of, take} from "rxjs";
import {fakeAsync, tick} from "@angular/core/testing";
import {subscribeSpyTo} from "@hirez_io/observer-spy";
import {map} from "rxjs/operators";

fdescribe('Observable Tests', () => {

    describe('Synchronous Observable (time does not matter)', () => {
        let source$: Observable<string>

        beforeEach(() => {
            source$ = of(1).pipe(
                map(() => 'Hallo')
            )
        })
        it('subscribeSpyTo ', () => {
            const result = subscribeSpyTo(source$);

            expect(result.getLastValue()).toEqual('Hallo')
        });
        it('done ', (done) => {
            const result = undefined;
            source$.subscribe(value => {
                expect(value).toEqual('Hallo')
                done()
            })
        });

        it('subscribe ', () => {
            // lazyness =)
            let result: any = undefined;
            source$.subscribe(value => {
                result = value
            })

            expect(result).toEqual('Hallo')
        });
    })
    describe('Async Observable (time matters)', () => {
        let source$: Observable<number>

        beforeEach(() => {
            source$ = interval(100).pipe(
                take(3)
            )
        })

        it('should emit 0,1,2 (fakeAsync)', fakeAsync(() => {
            let result: undefined | number = undefined;
            source$.subscribe(value => {
                result = value
            })
            tick(101)
            // @ts-ignore
            expect(result).toEqual(0)
            tick(101)
            // @ts-ignore
            expect(result).toEqual(1)
            tick(101)
            // @ts-ignore
            expect(result).toEqual(2)
            tick(101)
        }));

        it('should emit 0,1,2 (observerSpy)', fakeAsync(() => {
            const result = subscribeSpyTo(source$);

            tick(500)

            expect(result.getValues()).toEqual([
                0,
                1,
                2

            ])
        }));

    })




})
