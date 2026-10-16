import { useCases as raw, type UseCase as RawUseCase } from "./usecases.data";
import { services, type Service, type ServiceGroupSlug } from "./services";

/**
 * Case studies ("Programmes in action"), joined to the site's services and
 * families by name, so each one links to the service it shows and each
 * service page can list the case studies that show it.
 */
export type UseCase = RawUseCase & {
  serviceSlug: string;
  relatedSlugs: string[];
  group: ServiceGroupSlug;
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const byName = new Map(services.map((s) => [norm(s.name), s] as const));
/** The site service a case study names, matched loosely on spelling and punctuation. */
export const findService = (name: string): Service | undefined => byName.get(norm(name));
const find = findService;

export const useCases: UseCase[] = raw.map((u) => {
  const service = find(u.service);
  return {
    ...u,
    serviceSlug: service?.slug ?? "",
    relatedSlugs: u.related.map((r) => find(r)?.slug).filter((x): x is string => !!x),
    group: (service?.group ?? "gtm-strategy") as ServiceGroupSlug,
  };
});

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug);

/** The case studies that show a service: its own first, then those listing it as related. */
export function useCasesForService(slug: string) {
  const own = useCases.filter((u) => u.serviceSlug === slug);
  const related = useCases.filter((u) => u.serviceSlug !== slug && u.relatedSlugs.includes(slug));
  return { own, related };
}

export const useCasesForGroup = (group: ServiceGroupSlug) => useCases.filter((u) => u.group === group);

/** Other case studies worth reading after this one: same family first, then those sharing a service. */
export function moreLike(u: UseCase, n = 3) {
  const rest = useCases.filter((x) => x.slug !== u.slug);
  const family = rest.filter((x) => x.family === u.family);
  const shared = rest.filter((x) => x.family !== u.family && (x.serviceSlug === u.serviceSlug || x.relatedSlugs.includes(u.serviceSlug)));
  return [...family, ...shared].slice(0, n);
}

/** Families in document order, as the case studies name them. */
export const useCaseFamilies = Array.from(new Set(useCases.map((u) => u.family)));
export const useCaseIndustries = Array.from(new Set(useCases.map((u) => u.industry))).sort();

/** One case study per family, for the homepage. */
export const featuredUseCases = useCaseFamilies.map((f) => useCases.find((u) => u.family === f)!).slice(0, 6);
