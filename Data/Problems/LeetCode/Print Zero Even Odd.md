# 1116. Print Zero Even Odd

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/print-zero-even-odd](https://leetcode.com/problems/print-zero-even-odd)
**Companies:** Goldman Sachs, Google

---

## Problem Description

You have a function `printNumber` that can be called with an integer parameter and prints it to the console.

- For example, calling `printNumber(7)` prints `7` to the console.

You are given an instance of the class `ZeroEvenOdd` that has three functions: `zero`, `even`, and `odd`. The same instance of `ZeroEvenOdd` will be passed to three different threads:

- **Thread A:** calls `zero()` that should only output `0`'s.
- **Thread B:** calls `even()` that should only output even numbers.
- **Thread C:** calls `odd()` that should only output odd numbers.

Modify the given class to output the series `"010203040506..."` where the length of the series must be `2n`.

Implement the `ZeroEvenOdd` class:

- `ZeroEvenOdd(int n)` Initializes the object with the number `n` that represents the numbers that should be printed.
- `void zero(printNumber)` Calls `printNumber` to output one zero.
- `void even(printNumber)` Calls `printNumber` to output one even number.
- `void odd(printNumber)` Calls `printNumber` to output one odd number.

**Constraints:**
- `1 <= n <= 1000`

## Examples

**Example 1:**
```
Input: n = 2
Output: "0102"
Explanation: There are three threads being fired asynchronously.
One of them calls zero(), the other calls even(), and the last one calls odd().
"0102" is the correct output.
```

**Example 2:**
```
Input: n = 5
Output: "0102030405"
```

## Approach
Use two synchronization primitives (e.g., semaphores or condition variables) to coordinate the three threads:
1. A semaphore `zeroSem` initially released, allowing `zero()` to run first.
2. Two semaphores `oddSem` and `evenSem`, initially blocked.
3. After printing `0`, `zero()` releases either `oddSem` or `evenSem` depending on the next number's parity.
4. `odd()` and `even()` print their number and then release `zeroSem` for the next `0`.
The shared counter `current` tracks the next integer to print.

### Pseudocode
```text
CLASS ZeroEvenOdd:
    FUNCTION __init__(n):
        SET self.n ← n
        SET self.current ← 1
        SET self.zeroSem ← SEMAPHORE(1)   // allow zero first
        SET self.oddSem ← SEMAPHORE(0)
        SET self.evenSem ← SEMAPHORE(0)

    FUNCTION zero(printZero):
        WHILE self.current ≤ self.n:
            ACQUIRE self.zeroSem
            IF self.current > self.n: BREAK
            CALL printZero(0)
            IF self.current MOD 2 == 1:
                RELEASE self.oddSem
            ELSE:
                RELEASE self.evenSem

    FUNCTION odd(printNumber):
        WHILE TRUE:
            ACQUIRE self.oddSem
            IF self.current > self.n: BREAK
            CALL printNumber(self.current)
            SET self.current ← self.current + 1
            RELEASE self.zeroSem

    FUNCTION even(printNumber):
        WHILE TRUE:
            ACQUIRE self.evenSem
            IF self.current > self.n: BREAK
            CALL printNumber(self.current)
            SET self.current ← self.current + 1
            RELEASE self.zeroSem
```
Each method loops until the shared counter exceeds `n`. The semaphores guarantee the required ordering.

## Walkthrough
For `n = 3`:
1. `zero()` acquires `zeroSem`, prints `0`, releases `oddSem` (since `1` is odd).
2. `odd()` acquires `oddSem`, prints `1`, increments `current` to `2`, releases `zeroSem`.
3. `zero()` prints `0`, releases `evenSem` (now `2` is even).
4. `even()` prints `2`, increments to `3`, releases `zeroSem`.
5. `zero()` prints `0`, releases `oddSem`.
6. `odd()` prints `3`, increments to `4` (> n), releases `zeroSem` which then exits.
Output: `010203`.

## Complexity Analysis
- **Time:** `O(n)` – each number and each zero is printed exactly once.
- **Space:** `O(1)` – only a few synchronization primitives and counters are stored.

## Follow-Up Questions
1. How would you adapt the solution to use locks and condition variables instead of semaphores?
2. Can the algorithm be extended to support more than three threads with a different printing pattern?
3. What changes are needed if the output order should be `0 1 0 2 0 3 …` with spaces between characters?

## Key Takeaway
Coordinate the three threads with semaphores: `zero()` prints a zero and signals the appropriate parity thread, while the parity threads print the number and signal back to `zero()` for the next cycle.
