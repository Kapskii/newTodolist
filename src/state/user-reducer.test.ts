import { userReducer } from "./user-reducer";

test('user reducer should increment only age', ()=> {
    const startState = {age: 28, childrenCount: 1, name: 'Slava'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(29);
    expect(endState.childrenCount).toBe(1)
});

test('user reducer should increment only childrenCount', ()=> {
    const startState = {age: 28, childrenCount: 1, name: 'Slava'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(28);
    expect(endState.childrenCount).toBe(2)
});