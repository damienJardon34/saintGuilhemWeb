var modelPaths = [
    "model/place/sol/",
    "model/place/est/",
    "model/place/nord/",
    "model/place/ouest/",
    "model/place/sud/",
    "model/place/arbre/",
    "model/place/valDeGellone/",
    "model/eglise/entree/",
    "model/place/passage01/",
    "model/place/passage02/",
    
    "model/landscape/arbres/",
    "model/place/impasseVerdu/",

    "model/landscape/hills/",

    "model/eglise/nef/",
    "model/eglise/choeur/",
    "model/eglise/chapelleJoseph/",
    "model/eglise/chapelleMarie/",

    "model/cloitre/nord/",
    "model/cloitre/est/",
    "model/cloitre/sud/",
    "model/cloitre/ouest/",
    "model/cloitre/sol/",
    "model/cloitre/cypres/",


    "model/corDeNostraDona/01/",
    "model/corDeNostraDona/02/",
    "model/corDeNostraDona/03/",

    "model/corDeNostraDona/arriereEglise/",

    "model/planol/",

    "model/teron/place-sud/",
    "model/teron/place-nord/",
    "model/teron/placette/",
    "model/teron/rue/",

    "model/boutDuMonde/01/",
    "model/boutDuMonde/02/",
    "model/boutDuMonde/03/",

    "model/boutDuMonde/passageVerdu/"
];

const defaultLocationIndex = 0;

const zoneOfInterets = [
    {
        "name": "Place de la Liberté",
        "duration": 4.0,
        "positionStart": { "x": 8.3, "y": 13.3, "z": -64 },
        "lookAtStart": { "x": 3.75, "y": 17.2, "z": -56 },
        "position": { "x": 14.65, "y": 13.4, "z": -53.51 },
        "lookAt": { "x": 4.85, "y": 15.4, "z": -53.56 },
        "subZOI": [
            {
                "name": "Impasse du Verdu",
                "duration": 4.0,
                "positionStart": { "x": 30.33, "y": 11.9, "z": -73.38 },
                "lookAtStart": { "x": 23, "y": 12.37, "z": -66.6 },
                "position": { "x": 25.2, "y": 12.7, "z": -70.5 },
                "lookAt": { "x": 17.15, "y": 13.2, "z": -64.66 },
            },
        ]
    },
    {
        "name": "Abbaye de Gellone",
        "duration": 4.0,
        "positionStart": { "x": -2.6, "y": 13.5, "z": -29.57 },
        "lookAtStart": { "x": -2.21, "y": 13.05, "z": -19.59 },
        "position": { "x": -3, "y": 13.5, "z": -22 },
        "lookAt": { "x": -2.9, "y": 16.03, "z": -12.39 },
        "subZOI": [
            {
                "name": "Cloitre",
                "duration": 4.0,
                "positionStart": { "x": 31.8, "y": 12.37, "z": -29.3 },
                "lookAtStart": { "x": 25.4, "y": 13.4, "z": -21.73 },
                "position": { "x": 32.23, "y": 12.63, "z": -17.6 },
                "lookAt": { "x": 23.5, "y": 14.6, "z": -22.5 }
            },
            {
                "name": "Grand Orgue",
                "duration": 4.0,
                "positionStart": { "x": -1.65, "y": 13.42, "z": -14.65 },
                "lookAtStart": { "x": -3.28, "y": 15.2, "z": -24.35 },
                "position": { "x": -2.13, "y": 13.44, "z": -17.51 },
                "lookAt": { "x": -3.5, "y": 18.67, "z": -25.93 }
            },
            {
                "name": "Chevet de l'Abbatiale",
                "duration": 4.0,
                "positionStart": { "x": -2.96, "y": 14.24, "z": 15.03 },
                "lookAtStart": { "x": 6.36, "y": 15.3, "z": 11.59 },
                "position": { "x": 0.2, "y": 13.3, "z": 22.6 },
                "lookAt": { "x": 2, "y": 15.7, "z": 13 }
            }
        ]
    },
    {
        "name": "Chemin du Bout du Monde",
        "duration": 4.0,
        "positionStart": { "x": -132.53, "y": 17.17, "z": -117.5 },
        "lookAtStart": { "x": -126.5, "y": 16.12, "z": -125.4 },
        "position": { "x": -128.05, "y": 16.75, "z": -123.52 },
        "lookAt": { "x": -118.16, "y": 16.08, "z": -122.2 },
        "subZOI": [
            {
                "name": "Passage du Verdu (à sec)",
                "duration": 4.0,
                "positionStart": { "x": -79.86, "y": 14.06, "z": -114.7 },
                "lookAtStart": { "x": -75.55, "y": 12, "z": -123.46 },
                "position": { "x": -76.5, "y": 13.14, "z": -121 },
                "lookAt": { "x": -67.5, "y": 12.88, "z": -116.5 }
            },
            {
                "name": "Ruelle",
                "duration": 4.0,
                "positionStart": { "x": -76.7, "y": 18.8, "z": -86.2 },
                "lookAtStart": { "x": -67.16, "y": 16.13, "z": -84.72 },
                "position": { "x": -74.35, "y": 18.7, "z": -85.5 },
                "lookAt": { "x": -70.9, "y": 16.6, "z": -94.2 }
            },
        ]
    },
    {
        "name": "Rue du Teron",
        "duration": 4.0,
        "positionStart": { "x": -102.33, "y": 15.85, "z": -116.6 },
        "lookAtStart": { "x": -104.4, "y": 16.5, "z": -106.8 },
        "position": { "x": -104.7, "y": 16.3, "z": -111.43 },
        "lookAt": { "x": -100.37, "y": 17.55, "z": -102.42 },
        "subZOI": [
            {
                "name": "Table de Picnic",
                "duration": 4.0,
                "positionStart": { "x": -52.93, "y": 19.95, "z": -58.96 },
                "lookAtStart": { "x": -44.28, "y": 18.6, "z": -63.8 },
                "position": { "x": -48.16, "y": 19.32, "z": -60.26 },
                "lookAt": { "x": -47.24, "y": 18.46, "z": -69.8 }
            },
            {
                "name": "Placette",
                "duration": 4.0,
                "positionStart": { "x": -79, "y": 21.7, "z": -73.5 },
                "lookAtStart": { "x": -79.7, "y": 20.6, "z": -83.42 },
                "position": { "x": -79.42, "y": 21.29, "z": -78.1 },
                "lookAt": { "x": -70.34, "y": 19.52, "z": -81.9 }
            }
        ]
    },
];

const infoCaptions = [
    {
        "id": "roi_platane",
        "title": "Le Roi Platane",
        "position": { "x": -7.84, "y": 15.2, "z": -56.85 },
        "camPosition": { "x": -3.29, "y": 13.56, "z": -76.66 },
        "infos": "Au centre de la Place de la Liberté trône un majestueux platane aux dimensions impressionnantes : 20m de haut, pour une circonférence de 7m. Planté le 20 janvier 1855, on le surnomme le « Roi Platane ». Il est aujourd’hui classé « Arbre Remarquable ».",
        "img": "img/le-roi-platane-saint-guilhem-le-desert.jpg"
    },
    {
        "id": "chapiteau_porche",
        "title": "Chapiteaux à feuilles d'acanthe",
        "position": { "x": -8.94, "y": 15.32, "z": -40.34 },
        "camPosition": { "x": -5, "y": 13.68, "z": -45.82 },
        "infos": "La colonne et le chapiteau de gauche sont en marbre blanc. (XIIe siècle)",
        "img": "img/chapiteau_porche.jpg"
    },
    {
        "id": "abbaye",
        "title": "Abbaye de Gellone, joyau de l'art roman",
        "position": { "x": -0.04, "y": 22, "z": -2.2 },
        "camPosition": { "x": -3, "y": 13.5, "z": -22 },
        "infos": "<b>Depuis plus de douze siècles, un même élan guide visiteurs et pèlerins vers l’ancienne abbaye de Gellone à Saint-Guilhem-le-Désert…</b><br /><br />L’abbaye de Gellone, est un chef-d’œuvre du premier âge roman méridional, un sommet de l’art monastique. Marquée par les outrages du temps et parfois le désintérêt des hommes, l’abbaye de Gellone n’en demeure pas moins le témoin exceptionnel d’une histoire millénaire et révèle encore toute sa force symbolique et spirituelle.<br /><br />L’édifice, l’un des plus remarquables du midi, fut fondé à l’aube du IXe siècle par Guilhem d’Aquitaine, petit fils de Charles Martel, cousin de Charlemagne. Guerrier devenu moine, sa légende sera célébrée durant tout le Moyen Âge par les troubadours dans la fameuse Geste de Guillaume d’Orange. Dès le Xe siècle, ses reliques et un fragment de la Vraie Croix toujours conservés aujourd’hui, attirent fidèles et pénitents de toute l’Europe, et l’essor de la communauté bénédictine conduit, du XIe au XIVe siècle, à la construction d’une nouvelle abbaye.<br /><br />Au XIIe siècle, l’abbaye devient une étape incontournable sur le chemin de Saint-Jacques-de-Compostelle. Pèlerinage crée à l’aube du XIIe siècle pour vénérer le corps de l’apôtre Jacques le Majeur, il est l’un des trois chemins de pèlerinages de la chrétienté après Rome et Jérusalem. <b>En 1998, l’abbaye de Gellone est inscrite au patrimoine mondial par l’UNESCO au titre des chemins de Compostelle en France.</b><br /><br />A partir du XVe siècle, la nomination par le roi, d’abbés commendataires, dont la préoccupation première est de tirer le maximum de revenus de l’abbaye, la fragilise. L’entretien des bâtiments n’est plus assuré et la discipline monastique se relâche. Au XVIe siècle, le déclin du monastère est aggravé par les Guerres de Religions. L’abbaye prise par les protestants est pillée …<br /><br />Au XVIIe siècle, la congrégation bénédictine de Saint-Maur la sauvera de la ruine jusqu’à sa dissolution à la Révolution. L’église devient alors paroissiale et si l’édifice est épargné, le cloître, l’un des plus beaux du monde roman en son temps, fut marqué par l’abandon. Réduit à l’esthétique du fragment au XIXe siècle, il sera sacralisé par le classement de l’<b>abbaye de Gellone au titre des Monuments historiques dès 1840</b> et mystifié par son incroyable voyage outre-Atlantique au début du XXe siècle.<br /><br />Aujourd’hui encore, on ne peut qu’être surpris par ce sommet de l’art monastique. Jeux d’ombre et de lumière confèrent au chevet une majesté saisissante alors qu’à l’intérieur la pureté des lignes et la hauteur des voûtes de la nef en berceau plein cintre, renforcées d’arcs doubleaux témoignent d’un des plus parfaits exemples du premier âge roman méridional.<br /><br />Depuis 1978, la communauté du Carmel Saint-Joseph est venu rendre au monastère sa destination première.",
        "img": "img/abbaye-gellone.jpg"
    },
    {
        "id": "autel_guilhem",
        "title": "L’autel de Guilhem",
        "position": { "x": -0.06, "y": 13, "z": -3.95 },
        "camPosition": { "x": -0.94, "y": 13.37, "z": -7.05 },
        "infos": "Cet autel médiéval datant probablement du XIIe siècle se compose d’une table de marbre noir et trois dalles de marbre blanc enrichies d’un décor gravé et incrusté de verres colorés qui n’est pas sans rappeler la technique des émaux champlevés. D’une grande richesse ornementale, cet exceptionnel meuble fut certainement le maître-autel dont le panneau central se présente comme un livre ouvert. À gauche, une scène figure le Christ en majesté en faible relief et aux détails gravés, dans une mandorle entourée des symboles des Évangélistes. La scène de droite toujours en bas-relief et gravée, associe la Crucifixion où figurent la Vierge et Jean, à une Résurrection des morts au milieu de fleurs que dominent la lune et le soleil personnifiés. Les trois dalles sont décorées de bandes de rinceaux également incrustés de verres. Ainsi l’autel de Guilhem aura nécessité l’intervention d’au moins deux corps de métier, celui de sculpteurs et de verriers et reste sans équivalent une œuvre médiévale romane exceptionnelle et unique à l’échelle européenne.<br /><br />En 2012-2018, d’importants travaux de conservation et de restauration ont étés menés, et ont permis une meilleure connaissance de l’œuvre, des matériaux et des techniques employés pour sa réalisation. Les travaux ont portés sur le dessalement du marbre en raison de sels cristallisés responsables d’une lente et irrémédiable perte de matière; l’analyse de la composition de celui-ci ainsi que des verres. Ces travaux ont permis de mettre en valeur la qualité exceptionnelle de cet autel.",
        "img": "img/autel-abbaye.jpg"
    },
    {
        "id": "maitre_autel",
        "title": "Maître-autel",
        "position": { "x": 1.41, "y": 13.95, "z": 3.72 },
        "camPosition": { "x": -0.74, "y": 14.74, "z": -4.31 },
        "infos": "Peu avant la Révolution, un nouveau maître-autel a été installé dans l'église, entraînant le démontage de l'ancien dont la partie antérieure comprenait des plaques en marbre et pates de verres colorés de l'ancien autel de saint Guilhem. Ce maître-autel du xviiie siècle est un autel tombeau, galbé en élévation comportant un médaillon avec angelot au centre et un tabernacle à ailerons orné d'angelots. Deux anges en ronde bosse sont posés dessus. Sur l'autel sont posés six chandeliers en cuivre du xviiie siècle. La croix d'autel a été volée en 1994.</br></br>Il a été classé monument historique au titre immeuble en 1840.",
        "img": "img/maitre-autel.jpg"
    },
    {
        "id": "orgue",
        "title": "L’orgue du XVIIIe siècle",
        "position": { "x": -4.26, "y": 20.47, "z": -28.56 },
        "camPosition": { "x": -2.13, "y": 13.44, "z": -17.51 },
        "infos": "Construit peu avant 1782 par Jean-Pierre Cavaillé, ancêtre de l’illustre Aristide Cavaillé-Coll de Pézenas, l’orgue historique de Saint-Guilhem-le-Désert est l’un des rares témoins encore intact de la facture d’orgue de l’ancien régime. La tuyauterie est entièrement l’œuvre de Jean-Pierre Cavaillé, et conservée intégralement à quelques rares tuyaux près. Seule la tuyauterie du positif est récente. Son buffet à deux corps est en noyer avec des sculptures en tilleul. La console est en fenêtre, constituée de trois claviers d’origines, restaurées en 2011 par Michel Formentelli.<br /><br />Classé Monument Historique depuis 1974, il fait depuis l’objet de restaurations et de travaux d’entretiens constants. Construction du positif par Alain Sals en 1984, restauration des sommiers, du récit et des pédales en 1999. Après un nouveau grand relevage de l’orgue effectué en 2013, de nouveaux travaux d’entretien en 2017 ont permis un réglage plus affiné sur les jeux de anches. On peut l’entendre tous les dimanches lors de la messe d’avril à novembre, ainsi qu’à l’occasion des Heures d’Orgues programmées tout au long de l’année.",
        "img": "img/orgue.jpg"
    },
    {
        "id": "vraie_croix",
        "title": "Fragment de la Vraie Croix",
        "position": { "x": 7.61, "y": 14.71, "z": -4.22 },
        "camPosition": { "x": 6.77, "y": 13.04, "z": -7.98 },
        "infos": "Cette relique de la Sainte Croix est le seul présent que Saint-Guilhem consenti d'accepter de son parent et ami Charlemagne lors de sa fondation de l'abbaye et de son retrait dans les monts : \"Je donne à l'autel du Très Saint Sauveur, au bois de la Sainte Croix et au bienheureux Guilhem...\"  Il l'avait obtenue lui même du prêtre de Zacharie au nom du patriarche de Jérusalem en l'an 800 .</br></br>Ce don fit incontestablement la renommée de l'abbaye de Gellone. Elle attira de nombreux pèlerins et chevaliers. Élément fédérateur incontestable pour le pays de Guilhem, cet objet maintes fois convoité, protégé des envahisseurs et autres  protestants lors de la prise du village pendant les guerres de religion, est toujours conservé depuis l'an 800. Il est visible dans l'abbaye à droite du Choeur.</br></br>Le reliquaire est en argent, orné de pierres précieuses. Le bois qui constitue un des fragments de la vraie croix mesure \"cinq pouces de long\". Il repose dans une niche sous la protection d'une grille en fer.</br></br>Une sentence gravée en latin et en français frappe d'excommunions ipso facto quiconque emporterait la moindre parcelle de la relique, ou conseillerait seulement de le faire.",
        "img": "img/vraie_croix.jpg"
    },
    {
        "id": "stGuilhem",
        "title": "Reliquaire de Saint-Guilhem",
        "position": { "x": -7.46, "y": 14.07, "z": -1.76 },
        "camPosition": { "x": -7.03, "y": 13.04, "z": -6.88 },
        "infos": "",
         "img": "img/relique_st_Guilhem.jpg"
    },
    {
        "id": "cloitre",
        "title": "Le Cloitre",
        "position": { "x": 19.31, "y": 11.98, "z": -23.88 },
        "camPosition": { "x": 32.23, "y": 12.63, "z": -17.6 },
        "infos": "La notoriété de l’abbaye de Gellone est grandement liée au destin hors du commun de son cloître, l’un des plus beaux du monde roman en son temps. Ce cloître idéal, marqué par l’abandon et réduit à l’esthétique de fragment au XIXe siècle, sera sacralisé par le classement de l’abbaye de Gellone au titre des Monuments Historiques dès 1840 et mystifié par son incroyable voyage outre-Atlantique au début du XXe siècle.</br></br>En 1998, l’inscription de l’abbaye de Gellone au patrimoine mondial par l’UNESCO au titre des Chemins de Compostelle en France, ajoute encore à son rayonnement. Peu présente dans l’abbatiale romane, la sculpture monumentale est réservée aux points les plus symboliques de l’édifice comme le chevet et l’entrée où passent fidèles et pèlerins. En revanche, les décors sculptés s’accentuent dans le cloître érigé au sud de l’église, entre les XIe et les XIVe siècles. En résultent des chapiteaux corinthiens ornés de motifs végétaux finement ciselés, des colonnes ondées, spiralées… Les piliers accueillent de longs personnages aux drapés élégants et aux traits délicats.</br></br>Le cloître abbatial, inclus dans la première liste des Monuments Historiques par Prosper Mérimée, est une œuvre majeure de l’art roman du midi. Il a été vendu, démoli au XIXe siècle puis disséminé dans différentes collections françaises et américaines. La plus importante, se trouve aujourd’hui, au musée des cloîtres de New-York.",
         "img": "img/cloitre.jpg"
    },
    {
        "id": "cloitre_fontaine",
        "title": "Emplacement de l'ancienne fontaine",
        "position": { "x": 24.85, "y": 11.98, "z": -31.38 },
        "camPosition": { "x": 31.47, "y": 12.45, "z": -32.73 },
        "infos": "",
        "img": "img/cloitre-fontaine.jpg"
    },
];

const zones = [
    {
        "name": "place de la liberté",
        "poly": [
            { "x": -0.56, "y": -79.64 },
            { "x": 20, "y": -47.04 },
            { "x": -16.42, "y": -38 },
            { "x": -33.41, "y": -69.53 },
        ],
        "infoIds": [
            "roi_platane",
            "chapiteau_porche",
        ]
    },
    {
        "name": "abbaye",
        "poly": [
            { "x": 1.9, "y": -34.17 },
            { "x": 6.63, "y": -10 },
            { "x": 13.3, "y": -10.4 },
            { "x": 14.6, "y": 1.1 },
            { "x": -10.9, "y": 6.57 },
            { "x": -12.8, "y": -6.1 },
            { "x": -10.35, "y": -31.6 },
        ],
        "infoIds": [
            "abbaye",
            "autel_guilhem",
            "orgue",
            "maitre_autel",
            "vraie_croix",
            "stGuilhem"
        ]
    },
    {
        "name": "cloitre",
        "poly": [
            { "x": 30.5, "y": -39.87 },
            { "x": 35.9, "y": -15.83 },
            { "x": 7.05, "y": -10.71 },
            { "x": 3.14, "y": -30.82},
        ],
        "infoIds": [
            "cloitre",
            "cloitre_fontaine"
        ]
    }
];