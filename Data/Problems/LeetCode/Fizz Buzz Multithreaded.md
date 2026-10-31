# 1195. Fizz Buzz Multithreaded

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fizz-buzz-multithreaded](https://leetcode.com/problems/fizz-buzz-multithreaded)
**Companies:** Gartner, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Condition Variables / Semaphores ✅](#3-approach-condition-variables--semaphores-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You have the four functions:

- `printFizz` that prints the word `"fizz"` to the console,
- `printBuzz` that prints the word `"buzz"` to the console,
- `printFizzBuzz` that prints the word `"fizzbuzz"` to the console, and
- `printNumber` that prints a given integer to the console.

You are given an instance of the class `FizzBuzz` that has four functions: `fizz`, `buzz`, `fizzbuzz` and `number`. The same instance of `FizzBuzz` will be passed to four different threads:

- **Thread A:** calls `fizz()` that should output the word `"fizz"`.
- **Thread B:** calls `buzz()` that should output the word `"buzz"`.
- **Thread C:** calls `fizzbuzz()` that should output the word `"fizzbuzz"`.
- **Thread D:** calls `number()` that should only output the integers.

Modify the given class to output the series `[1, 2, "fizz", 4, "buzz", ...]` where the `i`-th token (**1-indexed**) of the series is:

- `"fizzbuzz"` if `i` is divisible by `3` and `5`,
- `"fizz"` if `i` is divisible by `3` and not `5`,
- `"buzz"` if `i` is divisible by `5` and not `3`, or
- `i` if `i` is not divisible by `3` or `5`.

Implement the `FizzBuzz` class:

- `FizzBuzz(int n)` Initializes the object with the number `n` that represents the length of the sequence that should be printed.
- `void fizz(printFizz)` Calls `printFizz` to output `"fizz"`.
- `void buzz(printBuzz)` Calls `printBuzz` to output `"buzz"`.
- `void fizzbuzz(printFizzBuzz)` Calls `printFizzBuzz` to output `"fizzbuzz"`.
- `void number(printNumber)` Calls `printnumber` to output the numbers.

**Constraints:**
- `1 <= n <= 50`

**Official examples:** `n = 15` → `[1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",11,"fizz",13,14,"fizzbuzz"]`; `n = 5` → `[1,2,"fizz",4,"buzz"]`. (Official output words are lowercase.)

---

## 2. Examples

**Example**
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```
The four threads coordinate so that the output sequence respects the FizzBuzz rules.

---

## 3. Approach: Condition Variables / Semaphores ✅

```text
CLASS FizzBuzz:
    CONSTRUCTOR(n):
        self.n ← n
        self.current ← 1
        self.lock ← Lock()
        self.cond ← Condition(self.lock)

    FUNCTION fizz(printFizz):
        WHILE TRUE:
            WITH self.cond:
                WHILE self.current ≤ self.n AND self.current % 3 ≠ 0 OR self.current % 5 = 0:
                    self.cond.WAIT()
                IF self.current > self.n: BREAK
                printFizz()
                self.current += 1
                self.cond.NOTIFY_ALL()

    FUNCTION buzz(printBuzz):
        WHILE TRUE:
            WITH self.cond:
                WHILE self.current ≤ self.n AND self.current % 5 ≠ 0 OR self.current % 3 = 0:
                    self.cond.WAIT()
                IF self.current > self.n: BREAK
                printBuzz()
                self.current += 1
                self.cond.NOTIFY_ALL()

    FUNCTION fizzbuzz(printFizzBuzz):
        WHILE TRUE:
            WITH self.cond:
                WHILE self.current ≤ self.n AND self.current % 15 ≠ 0:
                    self.cond.WAIT()
                IF self.current > self.n: BREAK
                printFizzBuzz()
                self.current += 1
                self.cond.NOTIFY_ALL()

    FUNCTION number(printNumber):
        WHILE TRUE:
            WITH self.cond:
                WHILE self.current ≤ self.n AND (self.current % 3 = 0 OR self.current % 5 = 0):
                    self.cond.WAIT()
                IF self.current > self.n: BREAK
                printNumber(self.current)
                self.current += 1
                self.cond.NOTIFY_ALL()
```
---

## 4. Walkthrough

| Step | Thread | Condition | Action |
|------|--------|-----------|--------|
| 1 | number | `current` not divisible by 3 or 5 | prints `1`, increments to 2 |
| 2 | number | same | prints `2`, increments to 3 |
| 3 | fizz | `current % 3 == 0` and not `%5` | prints `Fizz`, increments to 4 |
| 4 | number | prints `4` |
| 5 | buzz | `current % 5 == 0` | prints `Buzz`, increments to 6 |
| … | … | … | … |
The condition variable wakes all threads after each increment; only the thread whose condition matches proceeds.

---

## 5. Complexity Analysis

Each number from 1 to *n* is processed exactly once, and each thread performs constant-time checks. Time complexity is **O(n)**. The lock and condition variables use **O(1)** extra space.

---

## 6. Follow-Up Questions

1. How would you extend this solution to support an arbitrary number of custom rules?
2. Can you implement the same coordination using semaphores instead of condition variables?
3. What are the potential deadlock scenarios, and how does this design avoid them?

---

## 7. Key Takeaway

> Use a shared counter protected by a lock and a condition variable; each thread waits until the counter satisfies its rule, prints, increments, and notifies all others.
