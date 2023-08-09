import { describe, expect, it } from 'vitest'
import { parseDiff } from '../../../src/utils/parseDiff'

describe('parseDiff', () => {
  it('should add a file', () => {
    const diff = `diff --git a/file.txt b/file.txt
new file mode 100644
index 0000000..fc65282
--- /dev/null
+++ b/file.txt
@@ -0,0 +1,1 @@
+addedLine`
    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'added',
        lines: [
          {
            left: { t: 'empty' },
            right: { t: 'add', n: 1, v: 'addedLine' },
          },
        ],
      },
    ])
  })

  it('should add a line', () => {
    const diff = `diff --git a/file.txt b/file.txt
index fc65282..5be7893 100644
--- a/file.txt
+++ b/file.txt
@@ -9,2 +9,3 @@
 context1
+addedLine
 context2`

    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'changed',
        lines: [
          {
            left: { n: 9, v: 'context1' },
            right: { n: 9, v: 'context1' },
          },
          {
            left: { t: 'empty' },
            right: { t: 'add', n: 10, v: 'addedLine' },
          },
          {
            left: { n: 10, v: 'context2' },
            right: { n: 11, v: 'context2' },
          },
        ],
      },
    ])
  })

  it('should change a line', () => {
    const diff = `diff --git a/file.txt b/file.txt
index 5be7893..24239b6 100644
--- a/file.txt
+++ b/file.txt
@@ -9,3 +9,3 @@
 context1
-oldLine
+newLine
 context2`

    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'changed',
        lines: [
          {
            left: { n: 9, v: 'context1' },
            right: { n: 9, v: 'context1' },
          },
          {
            left: { t: 'remove', n: 10, v: 'oldLine' },
            right: { t: 'add', n: 10, v: 'newLine' },
          },
          {
            left: { n: 11, v: 'context2' },
            right: { n: 11, v: 'context2' },
          },
        ],
      },
    ])
  })

  it('should change multiple lines', () => {
    const diff = `diff --git a/file.txt b/file.txt
index 24239b6..b94ada5 100644
--- a/file.txt
+++ b/file.txt
@@ -25,3 +25,3 @@
 context1
-oldLine1
+newLine1
 context2
@@ -72,3 +72,3 @@
 context3
-oldLine2
+newLine2
 context4`

    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'changed',
        lines: [
          {
            left: { n: 25, v: 'context1' },
            right: { n: 25, v: 'context1' },
          },
          {
            left: { t: 'remove', n: 26, v: 'oldLine1' },
            right: { t: 'add', n: 26, v: 'newLine1' },
          },
          {
            left: { n: 27, v: 'context2' },
            right: { n: 27, v: 'context2' },
          },
          {
            left: { t: 'gap' },
            right: { t: 'gap' },
          },
          {
            left: { n: 72, v: 'context3' },
            right: { n: 72, v: 'context3' },
          },
          {
            left: { t: 'remove', n: 73, v: 'oldLine2' },
            right: { t: 'add', n: 73, v: 'newLine2' },
          },
          {
            left: { n: 74, v: 'context4' },
            right: { n: 74, v: 'context4' },
          },
        ],
      },
    ])
  })

  it('should delete a line', () => {
    const diff = `diff --git a/file.txt b/file.txt
index 5be7893..24239b6 100644
--- a/file.txt
+++ b/file.txt
@@ -9,3 +9,2 @@
 context1
-removedLine
 context2`

    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'changed',
        lines: [
          {
            left: { n: 9, v: 'context1' },
            right: { n: 9, v: 'context1' },
          },
          {
            left: { t: 'remove', n: 10, v: 'removedLine' },
            right: { t: 'empty' },
          },
          {
            left: { n: 11, v: 'context2' },
            right: { n: 10, v: 'context2' },
          },
        ],
      },
    ])
  })

  it('should delete a file', () => {
    const diff = `diff --git a/file.txt b/file.txt
deleted file mode 100644
index c5e7049..0000000
--- a/file.txt
+++ /dev/null
@@ -1,1 +0,0 @@
-removedLine`
    expect(parseDiff(diff)).toEqual([
      {
        name: 'file.txt',
        status: 'removed',
        lines: [
          {
            left: { t: 'remove', n: 1, v: 'removedLine' },
            right: { t: 'empty' },
          },
        ],
      },
    ])
  })
})
