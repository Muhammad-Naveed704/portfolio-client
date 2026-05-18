from pathlib import Path

svc = Path("src/pages/services.tsx")
st = svc.read_text(encoding="utf-8")

old = """                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4">
                        <motion.div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/90 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>"""

old = old.replace("motion.div", "motion.div").replace(
    "<motion.div className={`w-16", "<div className={`w-16"
).replace("</motion.div>\n                        <div>", "</div>\n                        <div>")

old = """                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <motion.div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/90 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>"""

# actual file uses plain div
old = """                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4">
                        <motion.div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/90 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>"""

# Fix - use exact from output
old = """                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                          <p className="text-white/90 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>"""

new = """                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg sm:shadow-2xl [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-7 sm:[&_svg]:h-7`}
                        >
                          {service.icon}
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <h3 className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-white/90 text-xs sm:text-sm leading-snug line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>"""

new = new.replace("</motion.div>", "</div>", 1)  # fix accidental motion.div close

if old in st:
    st = st.replace(old, new)
    svc.write_text(st, encoding="utf-8")
    print("services ok")
else:
    print("NOT FOUND")
