// Missions are sorted chronologically by launch date.
// Dates for planned missions (Artemis III, IV) are target estimates only.
export const MISSIONS: MissionType[] = [
  {
    id: "apollo11",
    name: "Apollo 11",
    status: "completed",
    launchDate: "1969-07-16",
    target: "Moon",
    description:
      "First crewed lunar landing. Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon on July 20, 1969; Michael Collins orbited above.",
  },
  {
    id: "voyager1",
    name: "Voyager 1",
    status: "active",
    launchDate: "1977-09-05",
    target: "Interstellar Space",
    description:
      "Humanity's most distant spacecraft has crossed into interstellar space, still transmitting data from over 24 billion kilometers away.",
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    status: "active",
    launchDate: "1990-04-24",
    target: "Low Earth Orbit",
    description:
      "Operating since 1990, Hubble has produced some of the most iconic imagery of the universe—from deep field observations to detailed planetary photography.",
  },
  {
    id: "cassini",
    name: "Cassini-Huygens",
    status: "completed",
    launchDate: "1997-10-15",
    target: "Saturn",
    description:
      "Spent 13 years orbiting Saturn, delivered the Huygens probe to Titan, and revolutionized understanding of the Saturn system before a planned atmospheric dive in 2017.",
  },
  {
    id: "perseverance",
    name: "Mars Perseverance Rover",
    status: "active",
    launchDate: "2020-07-30",
    target: "Mars - Jezero Crater",
    description:
      "Exploring the ancient river delta of Jezero Crater, collecting rock samples for potential future return to Earth and testing oxygen production on Mars.",
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    status: "active",
    launchDate: "2021-12-25",
    target: "L2 Lagrange Point",
    description:
      "The most powerful space telescope ever built, observing the universe in infrared to reveal the earliest galaxies and characterize exoplanet atmospheres.",
  },
  {
    id: "artemis1",
    name: "Artemis I",
    status: "completed",
    launchDate: "2022-11-16",
    target: "Moon (lunar orbit)",
    description:
      "Uncrewed test flight of the Space Launch System and Orion spacecraft. Orion spent 25 days in space and entered a distant retrograde orbit around the Moon before splashing down December 11, 2022.",
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    status: "active",
    launchDate: "2024-10-14",
    target: "Jupiter - Europa",
    description:
      "Investigating whether Jupiter's moon Europa could harbor conditions suitable for life, using repeated close flybys to map its icy surface and subsurface ocean.",
  },
  {
    id: "artemis2",
    name: "Artemis II",
    status: "completed",
    launchDate: "2026-04-01",
    target: "Moon (lunar flyby)",
    description:
      "First crewed Artemis mission (April 1-11, 2026). Four astronauts flew a free-return trajectory around the Moon aboard Orion, surpassing Apollo 13's record for farthest crewed mission from Earth at 252,756 miles (406,771 km).",
  },
  {
    id: "artemis3",
    name: "Artemis III",
    status: "planned",
    launchDate: "2027-12-01",
    target: "Earth Orbit (HLS test)",
    description:
      "Second crewed Artemis mission, targeting late 2027. Will conduct rendezvous and docking tests in Earth orbit with the SpaceX Starship HLS and Blue Origin Blue Moon landers, and evaluate the Axiom AxEMU spacesuits. Launch date is an estimate.",
  },
  {
    id: "artemis4",
    name: "Artemis IV",
    status: "planned",
    launchDate: "2028-03-01",
    target: "Moon - Lunar Surface",
    description:
      "Third crewed Artemis mission, targeting early 2028. Designated as the first crewed lunar landing since Apollo 17 in 1972. Two astronauts will descend to the surface via a commercial Human Landing System. Launch date is an estimate.",
  },
];
