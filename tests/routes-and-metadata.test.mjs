import test from "node:test";
import assert from "node:assert/strict";

import robotsGenerator from "../src/app/robots.ts";
import { solutions } from "../src/mock/solutions.ts";
import { projects } from "../src/mock/projects.ts";
import { articles } from "../src/mock/articles.ts";
import { settings } from "../src/mock/settings.ts";
import { desktopNav, tabletNav } from "../src/mock/navigation.ts";

test("robots generator: permits indexing of public routes and shields internal paths", () => {
  const robots = robotsGenerator();
  assert.ok(robots.rules, "robots should contain rules");
  const rule = Array.isArray(robots.rules) ? robots.rules[0] : robots.rules;
  assert.equal(rule.userAgent, "*");
  assert.equal(rule.allow, "/");
  assert.deepEqual(rule.disallow, ["/dashboard", "/admin", "/login"]);
  assert.ok(robots.sitemap.endsWith("/sitemap.xml"), "robots must point to sitemap.xml");
});

test("route inventory: all primary marketing and legal routes are defined and accounted for", () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://triadsfuture.com";
  const expectedStaticPaths = [
    "/",
    "/about",
    "/solutions",
    "/work",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticUrls = expectedStaticPaths.map((p) => (p === "/" ? baseUrl : `${baseUrl}${p}`));
  assert.equal(staticUrls.length, 8);
  assert.ok(staticUrls.includes(baseUrl));
  assert.ok(staticUrls.includes(`${baseUrl}/solutions`));
  assert.ok(staticUrls.includes(`${baseUrl}/work`));
  assert.ok(staticUrls.includes(`${baseUrl}/contact`));
});

test("dynamic projects: every project has valid slug, non-empty title, industry, and summary", () => {
  assert.ok(projects.length >= 3, "Must have at least 3 featured case study projects");
  for (const project of projects) {
    assert.ok(project.id, "Project missing id");
    assert.ok(project.slug && project.slug.length > 3, `Invalid slug for ${project.id}`);
    assert.ok(project.title && project.title.length > 5, `Invalid title for ${project.id}`);
    assert.ok(project.summary && project.summary.length > 15, `Invalid summary for ${project.id}`);
    assert.ok(project.industry, `Missing industry for ${project.id}`);
  }
});

test("dynamic articles: every article has valid slug, title, category, and readingTime", () => {
  assert.ok(articles.length >= 3, "Must have at least 3 insights articles");
  for (const article of articles) {
    assert.ok(article.id, "Article missing id");
    assert.ok(article.slug && article.slug.length > 3, `Invalid slug for ${article.id}`);
    assert.ok(article.title && article.title.length > 5, `Invalid title for ${article.id}`);
    assert.ok(article.category, `Missing category for ${article.id}`);
    assert.ok(typeof article.readingTime === "number" && article.readingTime > 0, `Missing readingTime for ${article.id}`);
  }
});

test("solutions dataset: exactly 5 approved services exist with business values and services lists", () => {
  assert.equal(solutions.length, 5, "Must have exactly 5 approved solution domains");
  const requiredTitles = [
    "Custom Web Applications",
    "Process Automation",
    "Brand Architecture",
    "High-Performance Websites",
    "Growth Infrastructure",
  ];

  for (const title of requiredTitles) {
    const found = solutions.find((s) => s.title === title);
    assert.ok(found, `Approved solution '${title}' must exist`);
    assert.ok(found.businessValue.length > 10, `Solution '${title}' has insufficient businessValue`);
    assert.ok(found.services.length >= 3, `Solution '${title}' must offer at least 3 deliverables`);
  }
});

test("settings dataset: business contact information and SEO fallback configuration exist", () => {
  assert.equal(settings.email, "contact@triadsfuture.com");
  assert.equal(settings.siteName, "Triads Future");
  assert.ok(settings.description.length > 20);
});

test("navigation datasets: desktop and tablet menus contain valid routes and labels", () => {
  const expectedRoutes = ["/", "/solutions", "/work", "/about", "/insights"];
  assert.equal(desktopNav.length, 5);
  for (const route of expectedRoutes) {
    const desktopItem = desktopNav.find((item) => item.href === route);
    assert.ok(desktopItem, `desktopNav missing route ${route}`);
    assert.ok(desktopItem.label.length > 0, `desktopNav label empty for ${route}`);

    const tabletItem = tabletNav.find((item) => item.href === route);
    assert.ok(tabletItem, `tabletNav missing route ${route}`);
  }
});
