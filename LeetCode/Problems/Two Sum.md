
# 1. Two Sum

**Difficulty:** 🟢 Easy
**Acceptance:** 57.5%
**LeetCode:** [https://leetcode.com/problems/two-sum](https://leetcode.com/problems/two-sum)
**Companies:** Accenture, Accolite, Adobe, Agoda, Airbnb, Airbus, Akamai, Altimetrik, Amazon, Amd, American Express, Anduril, Apple, Atlassian, Autodesk, Barclays, Blackrock, Bloomberg, Bytedance, Cadence, Capgemini, Capital One, Careem, Cisco, Citadel, Citi, Coditas, Cognizant, Comcast, Criteo, Databricks, De Shaw, Delhivery, Dell, Deloitte, Deutsche Bank, Devrev, Doordash, Dropbox, Earnin, Ebay, Epam Systems, Epic Systems, Expedia, Ey, Flipkart, Fpt, Fractal Analytics, Freshworks, Garmin, Globallogic, Goldman Sachs, Google, Grab, Hashedin, Hcl, Honeywell, Huawei, Hubspot, Ibm, Infosys, Intel, Intuit, Jane Street, Jio, Jpmorgan, Juspay, Karat, Kla, Linkedin, Lowe, Mastercard, Meesho, Meta, Microsoft, Mindtree, Morgan Stanley, Naver, Netapp, Nielsen, Nvidia, Optum, Oracle, Ozon, Palo Alto Networks, Paypal, Paytm, Persistent Systems, Phonepe, Playsimple, Pwc, Qualcomm, Quantiphi, Rally Health, Roblox, Salesforce, Samsung, Sap, Servicenow, Siemens, Snowflake, Sony, Splunk, Spotify, Swiggy, Synopsys, Tcs, Tech Mahindra, Tekion, Tesla, Thoughtworks, Tiger Analytics, Tiktok, Tinkoff, Toast, Turing, Uber, Ukg, Virtusa, Visa, Vk, Walmart Labs, Warnermedia, Western Digital, Wipro, Yahoo, Yandex, Yelp, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: Hash Map — O(n) ✅](#4-approach-2-hash-map--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
   - [7.1 What if the array is sorted?](#71-what-if-the-array-is-sorted)
   - [7.2 What if there are multiple valid pairs?](#72-what-if-there-are-multiple-valid-pairs)
   - [7.3 What about duplicates?](#73-what-about-duplicates)
   - [7.4 Three Sum / k-Sum generalization?](#74-three-sum--k-sum-generalization)

---

## 1. Problem Description

Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers such that they add up to `target`.

**Constraints:**
- Each input has **exactly one solution**.
- You may **not** use the same element twice.
- You can return the answer in any order.

---

## 2. Examples

```
Example 1:
  Input:  nums = [2, 7, 11, 15], target = 9
  Output: [0, 1]
  Reason: nums[0] + nums[1] = 2 + 7 = 9

Example 2:
  Input:  nums = [3, 2, 4], target = 6
  Output: [1, 2]
  Reason: nums[1] + nums[2] = 2 + 4 = 6

Example 3:
  Input:  nums = [3, 3], target = 6
  Output: [0, 1]
```

---

## 3. Approach 1: Brute Force — O(n²)

Check every pair of elements.

```
FUNCTION twoSumBrute(nums, target):

    FOR i ← 0 TO n - 2:
        FOR j ← i + 1 TO n - 1:
            IF nums[i] + nums[j] == target:
                RETURN [i, j]

    RETURN []       // no solution found
```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(1) |

Simple but not optimal.

---

## 4. Approach 2: Hash Map — O(n) ✅

### Key Insight

For each number `nums[i]`, we need its **complement** `target - nums[i]`. If we've already seen the complement, we have our answer. A hash map gives O(1) lookups.

### Why One Pass Is Enough

We don't need to build the entire map first. As we iterate, if the complement was already visited (and stored in the map), we return immediately. If not, we store the current number for future lookups.

### Pseudocode

```
FUNCTION twoSum(nums, target):

    map = {}                          // value → index

    FOR i ← 0 TO n - 1:
        complement = target - nums[i]

        IF complement IN map:
            RETURN [map[complement], i]

        map[nums[i]] = i

    RETURN []                         // no solution found
```

---

## 5. Walkthrough

```
nums = [2, 7, 11, 15],  target = 9
map = {}

i = 0:  nums[0] = 2
        complement = 9 - 2 = 7
        7 NOT in map
        map = {2: 0}

i = 1:  nums[1] = 7
        complement = 9 - 7 = 2
        2 IS in map → map[2] = 0
        RETURN [0, 1] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **Hash Map** | **O(n)** | **O(n)** |

---

## 7. Follow-Up Questions

### 7.1 What if the array is sorted?

Use the **two-pointer** technique — no hash map needed.

```
FUNCTION twoSumSorted(nums, target):

    left  ← 0
    right ← n - 1

    WHILE left < right:
        sum = nums[left] + nums[right]

        IF sum == target:
            RETURN [left, right]
        ELSE IF sum < target:
            left += 1
        ELSE:
            right -= 1

    RETURN []
```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

This is **LeetCode #167 — Two Sum II (Input Array Is Sorted)**.

---

### 7.2 What if there are multiple valid pairs?

Collect all pairs instead of returning early:

```
FUNCTION twoSumAll(nums, target):

    map     = {}          // value → list of indices
    results = []

    FOR i ← 0 TO n - 1:
        complement = target - nums[i]

        IF complement IN map:
            FOR j IN map[complement]:
                results.ADD([j, i])

        IF nums[i] NOT IN map:
            map[nums[i]] = []
        map[nums[i]].ADD(i)

    RETURN results
```

---

### 7.3 What about duplicates?

The original problem guarantees exactly one solution, but duplicates like `[3, 3]` with `target = 6` still work because:

- At `i = 0`: we store `map[3] = 0`.
- At `i = 1`: complement is `6 - 3 = 3`, which IS in the map at index 0.
- We return `[0, 1]`. The current element at index 1 hasn't overwritten the map entry yet.

The **order matters**: we check *before* we insert, so we never match an element with itself.

---

### 7.4 Three Sum / k-Sum generalization?

**3Sum (LeetCode #15):** Sort the array, fix one element, then use two pointers on the rest. Time: O(n²).

**k-Sum generalization:** Recursively reduce k-Sum to (k-1)-Sum until you reach 2-Sum, which you solve with two pointers.

```
FUNCTION kSum(nums, target, k):

    sort nums

    FUNCTION helper(start, target, k):
        IF k == 2:
            RETURN twoSumSorted(nums[start..], target)

        results = []
        FOR i ← start TO n - k:
            IF i > start AND nums[i] == nums[i-1]:
                CONTINUE                              // skip duplicates

            FOR subset IN helper(i + 1, target - nums[i], k - 1):
                results.ADD([nums[i]] + subset)

        RETURN results

    RETURN helper(0, target, k)
```

**Time:** O(n^(k-1)) for k ≥ 2.

---

## Key Takeaway

> **Two Sum is the gateway problem** — it introduces the hash map "complement lookup" pattern that appears in dozens of other problems. Master it and recognize when a problem is asking "find a pair that satisfies a condition" — that's your cue to think hash map or two pointers.
