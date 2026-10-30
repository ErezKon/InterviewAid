# 2704. To Be Or Not To Be

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/to-be-or-not-to-be](https://leetcode.com/problems/to-be-or-not-to-be)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Write a function `expect` that helps developers test their code. It should take in any value `val` and return an object with the following two functions.

- `toBe(val)` accepts another value and returns `true` if the two values `===` each other. If they are not equal, it should throw an error `"Not Equal"`.
- `notToBe(val)` accepts another value and returns `true` if the two values `!==` each other. If they are equal, it should throw an error `"Equal"`.

**Constraints:** none specified (JavaScript closure problem).

## Examples

**Example 1:**
```
Input: func = () => expect(5).toBe(5)
Output: {"value": true}
Explanation: 5 === 5 so this expression returns true.
```

**Example 2:**
```
Input: func = () => expect(5).toBe(null)
Output: {"error": "Not Equal"}
Explanation: 5 !== null so this expression throw the error "Not Equal".
```

**Example 3:**
```
Input: func = () => expect(5).notToBe(null)
Output: {"value": true}
Explanation: 5 !== null so this expression returns true.
```

## Approach
Create a function `expect` that captures the received value in a closure. Return an object with `toBe` and `notToBe` methods that compare the captured value with the expected argument and throw descriptive errors when the condition fails.

```text
FUNCTION expect(value):
    RETURN OBJECT WITH:
        FUNCTION toBe(expected):
            IF value !== expected:
                THROW Error("Not Equal")
            RETURN true
        FUNCTION notToBe(expected):
            IF value === expected:
                THROW Error("Equal")
            RETURN true
```

## Walkthrough
For `expect(5).toBe(5)`:
1. `expect` stores `5`.
2. `toBe` receives `expected = 5`.
3. Comparison `5 !== 5` is false, so no error is thrown.
4. Returns `true` indicating the assertion succeeded.

## Complexity Analysis
Time: O(1) for each assertion call. Space: O(1) additional memory for the captured value.

## Follow-Up Questions
* How would you extend this utility to support deep equality for objects and arrays?
* Can you add asynchronous assertion support, e.g., `toResolve` for promises?
* How would you integrate custom error messages for better test diagnostics?

## Key Takeaway
A simple assertion helper can be built using closures to capture the actual value and provide `toBe`/`notToBe` methods that validate equality with clear error handling.
