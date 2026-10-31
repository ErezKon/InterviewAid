# 2739. Total Distance Traveled

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/total-distance-traveled](https://leetcode.com/problems/total-distance-traveled)
**Companies:** Compass, Meta

---

## Problem Description

A truck has two fuel tanks. You are given two integers, `mainTank` representing the fuel present in the main tank in liters and `additionalTank` representing the fuel present in the additional tank in liters.

The truck has a mileage of `10` km per liter. Whenever `5` liters of fuel get used up in the main tank, if the additional tank has at least `1` liters of fuel, `1` liters of fuel will be transferred from the additional tank to the main tank.

Return *the maximum distance which can be traveled.*

**Note:** Injection from the additional tank is not continuous. It happens suddenly and immediately for every 5 liters consumed.

**Constraints:**
- `1 <= mainTank, additionalTank <= 100`

## Examples

**Example 1:**
```
Input: mainTank = 5, additionalTank = 10
Output: 60
Explanation:
After spending 5 litre of fuel, fuel remaining is (5 - 5 + 1) = 1 litre and distance traveled is 50km.
After spending another 1 litre of fuel, no fuel gets injected in the main tank and the main tank becomes empty.
Total distance traveled is 60km.
```

**Example 2:**
```
Input: mainTank = 1, additionalTank = 2
Output: 10
Explanation:
After spending 1 litre of fuel, the main tank becomes empty.
Total distance traveled is 10km.
```

## Approach
Simulate the fuel consumption in chunks of 5 liters. While the main tank holds at least 5 liters, burn 5 liters (+50 km); if the additional tank still has fuel, move 1 liter into the main tank. When fewer than 5 liters remain, they are burned with no further injection, adding `mainTank × 10` km.

Closed form: each injection needs 4 "net" liters from the main tank beyond the last one, so the number of injections is `min(additionalTank, (mainTank − 1) DIV 4)` and the answer is `(mainTank + injections) × 10`.

```text
FUNCTION distanceTraveled(mainTank, additionalTank):
    distance ← 0
    WHILE mainTank >= 5
        mainTank ← mainTank - 5
        distance ← distance + 50
        IF additionalTank > 0
            additionalTank ← additionalTank - 1
            mainTank ← mainTank + 1
    RETURN distance + mainTank * 10
```

## Walkthrough
Example 1: `mainTank = 5`, `additionalTank = 10`:
1. mainTank = 5 ≥ 5 → burn 5 liters, distance = 50, mainTank = 0; inject 1 liter → mainTank = 1, additionalTank = 9.
2. mainTank = 1 < 5 → loop ends.
3. Burn the remaining 1 liter: distance = 50 + 1 × 10 = **60**, matching the expected output.

## Complexity Analysis
*Time*: O(mainTank + additionalTank) for the simulation (O(1) with the closed form)
*Space*: O(1)

## Follow-Up Questions
1. Derive and prove the closed form `(mainTank + min(additionalTank, (mainTank − 1) DIV 4)) × 10`.
2. How would the solution change if the transfer happened every `k` liters and moved `x` liters each time?
3. What if the values were up to 10^18 — which approach would you use?

## Key Takeaway
Simulating in discrete chunks of 5 liters captures the "sudden injection" rule exactly; counting how many chunks can occur gives an O(1) formula.
