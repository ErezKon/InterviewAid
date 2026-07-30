# 2704. To Be Or Not To Be

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/to-be-or-not-to-be](https://leetcode.com/problems/to-be-or-not-to-be)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Implement a minimal assertion utility `expect` that provides two methods:
- `toBe(expected)`: throws an error if the received value is not strictly equal to `expected`.
- `notToBe(expected)`: throws an error if the received value is strictly equal to `expected`.
The utility should return `true` when the assertion passes, enabling chaining in test code.

## Examples
| Code | Result |
|------|--------|
| `expect(5).toBe(5)` | `true` (passes) |
| `expect(5).toBe(3)` | throws `Not Equal` error |
| `expect('a').notToBe('b')` | `true` (passes) |
| `expect('a').notToBe('a')` | throws `Equal` error |

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
